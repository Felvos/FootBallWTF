
function generateHTMLTableForQuery(data)
{
    if (data.length === 0)
    {
        return "<p> Данные не найдены. </p>";
    }
    const columns = Object.keys(data[0]);
    let table = "<table><threat><tr>";
    columns.forEach(column =>{
        table += `<th>${column}</th>`;
    });
    table += '</tr></thead><tbody>';

    data.forEach(row => {
        table += '<tr>';
        columns.forEach(column => {
            table += `<td>${row[column]}</td>`;
        });
        table += '</tr>';
    });

    table += '</tbody></table>';
    return table;
}
function generateHTMLTableForQueryAdding(data) {
    if (data.length === 0) {
        return "<p> Данные не найдены. </p>";
    }
    const columns = Object.keys(data[0]).filter(column => !column.toLowerCase().includes('id'));
    let table = "<table><thead><tr>";
    
    columns.forEach(column => {
        table += `<th>${column}</th>`;
    });
    table += '</tr></thead><tbody>';

    data.forEach(row => {
        table += '<tr>';
        columns.forEach(column => {
            table += `<td>${row[column]}</td>`;
        });
        table += '</tr>';
    });

    table += '</tbody></table>';
    return table;
}
function generateHTMLTableForQueryDeleting(data) {
    if (data.length === 0) {
        return "<p> Данные не найдены. </p>";
    }

    const columns = Object.keys(data[0]);
    let table = "<table><thead><tr>";

    columns.forEach(column => {
        if (column.toLowerCase() !== 'id') {
            table += `<th>${column}</th>`;
        }
    });

    table += `<th>Удалить</th>`;
    table += '</tr></thead><tbody>';

    data.forEach(row => {
        table += '<tr>';
        columns.forEach(column => {
            if (column.toLowerCase() !== 'id') {
                table += `<td>${row[column]}</td>`;
            }
        });

        table += `<td><input class="checkbox" type="checkbox" data-id="${row['id']}"></td>`;
        table += '</tr>';
    });

    table += '</tbody></table>';
    return table;
}

function generateHTMLTableForQueryUpdating(data) {
    if (data.length === 0) {
        return "<p> Данные не найдены. </p>";
    }

    const columns = Object.keys(data[0]);
    let table = "<table><thead><tr>";

    columns.forEach(column => {
        if (column.toLowerCase() !== 'id') {
            table += `<th>${column}</th>`;
        }
    });

    table += '</tr></thead><tbody>';

    data.forEach(row => {
        table += `<tr data-id="${row['id']}">`;
        columns.forEach(column => {
            if (column.toLowerCase() !== 'id') {
                table += `<td>${row[column]}</td>`;
            }
        });
        table += '</tr>';
    });

    table += '</tbody></table>';
    return table;
}

 

