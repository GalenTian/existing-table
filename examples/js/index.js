$(function () {
    var $table = $('#demo-base');

    var $header = $('thead > tr', $table);
    var $body = $('tbody', $table);

    var columnCount = 24,
        rowCount = 24;

    for (var i = 0; i < columnCount; i++) {
        $header.append('<th>Header ' + i + '</th>')
    }

    for (var i = 0; i < rowCount; i++) {
        var $row = $('<tr></tr>');

        for (var j = 0; j < columnCount; j++) {
            $row.append('<td>Content ' + i + '-' + j + '</td>');
        }

        $body.append($row);
    }

    $table.table({
        frozenColumnsCount: 0
    });
});