export const parseMeta = ({ meta }) => {
  if (meta === undefined) {
    return {};
  } else {
    return meta;
  }
}

export const flattenObject = (ob) => {
    var toReturn = {};

    for (var i in ob) {
        if (!ob.hasOwnProperty(i)) continue;

        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x)) continue;

                toReturn[i + '.' + x] = flatObject[x];
            }
        } else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
}

export const parseFilters = (
    filter,
    defaultListOp
) => {
    let result = {};

    Object.keys(filter).forEach(function (key) {
        // key: the name of the object key

        const splitKey = key.split('@');
        const operation =
            splitKey.length === 2
                ? (splitKey[1])
                : defaultListOp;

        let values;
        if (['like', 'ilike'].includes(operation)) {
            // we split the search term in words
            values = filter[key].trim().split(/\s+/);
        } else {
            values = [filter[key]];
        }

        values.forEach(value => {
            // if operator is intentionally blank, rpc syntax
            let op = operation.includes('like')
                ? `${operation}.*${value}*`
                : operation.length === 0
                ? `${value}`
                : `${operation}.${value}`;

            if (result[splitKey[0]] === undefined) {
                // first operator for the key, we add it to the dict
                result[splitKey[0]] = op;
            } else {
                if (!Array.isArray(result[splitKey[0]])) {
                    // second operator, we transform to an array
                    result[splitKey[0]] = [result[splitKey[0]], op];
                } else {
                    // third and subsequent, we add to array
                    result[splitKey[0]].push(op);
                }
            }
        });
    });

    return result;
};

// compound keys capability
// export type PrimaryKey = Array<string>;

export const getPrimaryKey = (
    resource,
    primaryKeys
) => {
    return primaryKeys.get(resource) || ['id'];
};

export const decodeId = (
    id,
    primaryKey
) => {
    if (isCompoundKey(primaryKey)) {
        return JSON.parse(id.toString());
    } else {
        return [id.toString()];
    }
};

export const encodeId = (data, primaryKey) => {
    if (isCompoundKey(primaryKey)) {
        return JSON.stringify(primaryKey.map(key => data[key]));
    } else {
        return data[primaryKey[0]];
    }
};

export const dataWithId = (data, primaryKey) => {
    if (JSON.stringify(primaryKey) === JSON.stringify(['id'])) {
        return data;
    }

    return Object.assign(data, {
        id: encodeId(data, primaryKey),
    });
};

export const isCompoundKey = (primaryKey) => {
    return primaryKey.length > 1;
};

export const getQuery = (
    primaryKey,
    ids,
    resource
) => {
    if (Array.isArray(ids) && ids.length > 1) {
        // no standardized query with multiple ids possible for rpc endpoints which are api-exposed database functions
        if (resource.startsWith('rpc/')) {
            console.error(
                "PostgREST's rpc endpoints are not intended to be handled as views. Therefore, no query generation for multiple key values implemented!"
            );

            return;
        }

        if (isCompoundKey(primaryKey)) {
            // TODO: Should be URL encoded
            return `or=(${ids.map(id => {
                const primaryKeyParams = decodeId(id, primaryKey);
                return `and(${primaryKey
                    .map((key, i) => `${key}.eq.${primaryKeyParams[i]}`)
                    .join(',')})`;
            })})`;
        } else {
            return new URLSearchParams({
                [primaryKey[0]]: `in.(${ids.join(',')})`,
            }).toString();
        }
    } else {
        // if ids is one Identifier
        const id = ids.toString();
        const primaryKeyParams = decodeId(id, primaryKey);

        if (isCompoundKey(primaryKey)) {
            if (resource.startsWith('rpc/'))
                // TODO: Should be URL encoded
                return `${primaryKey
                    .map(
                        (key, i) => `${key}=${primaryKeyParams[i]}`
                    )
                    .join('&')}`;
            // TODO: Should be URL encoded
            else
                return `and=(${primaryKey
                    .map(
                        (key, i) =>
                            `${key}.eq.${primaryKeyParams[i]}`
                    )
                    .join(',')})`;
        } else {
            return new URLSearchParams([
                [primaryKey[0], `eq.${id}`],
            ]).toString();
        }
    }
};

export const getKeyData = (primaryKey, data) => {
    if (isCompoundKey(primaryKey)) {
        return primaryKey.reduce(
            (keyData, key) => ({
                ...keyData,
                [key]: data[key],
            }),
            {}
        );
    } else {
        return { [primaryKey[0]]: data[primaryKey[0]] };
    }
};

export const getOrderBy = (
    field,
    order,
    primaryKey
) => {
    if (field === 'id') {
        return primaryKey.map(key => `${key}.${order.toLowerCase()}`).join(',');
    } else {
        return `${field}.${order.toLowerCase()}`;
    }
};
