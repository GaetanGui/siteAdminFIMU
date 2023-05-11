export const parser = async (file, sep, sep2) => {

    let cols = file.split(sep2);
    let val = []
    let result = [];
    let row = [];

    for (let i = 0; i < cols.length; i++){
        val = cols[i].split(sep);
        console.log(val);

        for (let j = 0; j < val.length; j++){
            val[j] = val[j].replaceAll('\n', '')
            row.push(val[j]);
        }
        result.push(row);
        row = [];
    }
    return result;

    // for (let i = 0; i < cols.length; i++) {
    //     row.push(cols[i]);
    //
    //     if (row.length === colum || i === cols.length - 1) {
    //         result.push(row);
    //         row = [];
    //     }
    // }

}