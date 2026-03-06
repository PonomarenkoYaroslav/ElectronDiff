function compareTrees(treeA, treeB) {

    const identical = [];

    for (const [hash, nodesA] of treeA.hashMap) {

        if (treeB.hashMap.has(hash)) {

            const nodesB = treeB.hashMap.get(hash);

            for (const a of nodesA) {
                for (const b of nodesB) {

                    identical.push({
                        fileA: a.fullPath,
                        fileB: b.fullPath
                    });

                }
            }
        }
    }

    return { identical };
}

module.exports = { compareTrees };