export const getByValue = <K, V>(map: Map<K, V>, searchValue: V): K => {
    for (const [key, value] of map.entries()) {
        if (value === searchValue) return key;
    }

    return null;
};

export const incrementMap = <K = string>(map: Map<K, number>, key: K, ammount = 1) => {
    if (!map.has(key)) {
        map.set(key, 0);
    }

    map.set(key, map.get(key) + ammount);
};
