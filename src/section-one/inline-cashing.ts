export function inlineCashingTest() {
    const temp1 = { key1: 'key1', key2: 'key2' };
    const temp2 = { key1: 'key11', key2: 'key22' };
    const temp3 = { key1: 'key111', key2: 'key222' };
    const temp4 = { key1: 'key1111', key2: 'key2222' };
    const tempList = [temp2, temp3, temp1, temp4];
    const getKey = (obj: any) => obj.key1;
    console.time('engine_cash');
    for (var i = 0; i < 1000 * 1000 * 1000; i++) {
        getKey(tempList[i & 3]);
    }
    console.timeEnd('engine_cash');
}

export function inlineCashingTestByDeOptimize() {
    const temp1 = { key1: 'key1', key2: 'key2', key3: 88 };
    const temp2 = { key1: 'key11', key2: 'key22', key3: 'test' };
    const temp3 = { key1: 'key111', key2: 'key222' };
    const temp4 = { key1: 'key1111', key2: 'key2222', j: 'jjjj' };
    const tempList = [temp2, temp3, temp1, temp4];
    const getKey = (obj: any) => obj.key1;
    console.time('engine_deoptimize');
    for (var i = 0; i < 1000 * 1000 * 1000; i++) {
        getKey(tempList[i & 3]);
    }
    console.timeEnd('engine_deoptimize');
}
