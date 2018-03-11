require.config({
    baseUrl: '../../lib/sql.js/js/'
});
require(['sql'], function success(SQL) {
    if (typeof SQL !== 'object') {
        document.body.style.backgroundColor = 'red';
        alert("Failed to require sql.js through AMD");
    } else {
        document.body.style.backgroundColor = 'green';
        alert("sql.js successfully loaded with AMD");
    }
}, function error(err) {
    console.log(err);
    alert("Module load failed");
});