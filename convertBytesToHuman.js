/*
 * В этом задании надо разработать функцию
 * `convertBytesToHuman`. Эта функция  должна принимать
 * аргумент `bytes` только числового типа.
 * На выходе функция должна отдать
 * человекопонятную строку, которая будет
 * отражать размер файла. Примеры использования:
 * `convertBytesToHuman(1024) === '1 KB';`
 * `convertBytesToHuman(123123123) === '117.42 MB';`
 * Необходимо предусмотреть защиту от
 * передачи аргументов неправильного типа
 * и класса (например, отрицательные числа)
 */

export default function convertBytesToHuman(bytes) {
    if (typeof bytes !== 'number')
      return false;
    if (bytes < 0 || isNaN(bytes))
      return false;

    let kilobytes;
    let megabytes;
    let gigabytes;
    let terabytes;
    let petabytes;

    if (bytes >= 1024) {
        kilobytes = Number( (bytes/1024).toFixed(2));
        if (kilobytes >= 1024) {
            megabytes = Number( (kilobytes/1024).toFixed(2))

            if (megabytes >= 1024) {
                gigabytes = Number( (megabytes/1024).toFixed(2))

                if (gigabytes >= 1024) {
                    terabytes = Number( (gigabytes/1024).toFixed( 2))
                    if (terabytes >= 1024) {
                        petabytes = Number( (terabytes/1024).toFixed( 2))
                    }
                }
            }
        }
    }

    if (petabytes)
        return petabytes + ' PB'
    else if (terabytes)
        return terabytes + ' TB'
    else if (gigabytes)
        return gigabytes + ' GB'
    else if (megabytes)
        return megabytes + ' MB'
    else if (kilobytes)
        return kilobytes + ' KB'
    else
        return bytes + ' B'

}