function throttle(fn, wait) {
    let flag = true;
    return function() {
        if (!flag) return;
        flag = false;
        setTimeout(() => {
            fn.call(this, arguments);
            flag = true;
        }, wait);
    };
}    

// test
function sayThrottle() {
    console.log("节流成功！");
}