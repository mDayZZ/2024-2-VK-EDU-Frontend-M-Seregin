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
    if (typeof bytes !== 'number') {
        return false;
    }
    if (bytes < 0 || isNaN(bytes)) {
        return false;
    }

    let remainingBytes = bytes;
    const unitBytes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
    let unitIndex = 0;

    while (remainingBytes>=1024) {
        if (unitIndex === 5) {
            return `${remainingBytes} ${unitBytes[unitIndex]}`
        }

        remainingBytes = Number((remainingBytes/1024).toFixed(2));
        unitIndex++;
    }

    return `${remainingBytes} ${unitBytes[unitIndex]}`
}