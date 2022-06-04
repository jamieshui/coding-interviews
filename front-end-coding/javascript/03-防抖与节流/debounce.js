function debounce(fn, wait) {
    let timeout = null;
    return function() {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            fn.call(this, arguments);
        }, wait);
    };
}

// test
function sayDebounce() {
    // ... 有些需要防抖的工作，在这里执行
    console.log("防抖成功！");
}