export class DatetimeCommon {

  static createDateAsUTC(): Date {
    let current = new Date();
    return new Date(Date.UTC(current.getFullYear(), current.getMonth(), current.getDate(), current.getHours(),
      current.getMinutes(), current.getSeconds()));
  }

  static createDateFromString(data: string): Date {
    let dataArr = data.split('-', -1);
    return new Date(Date.UTC(parseInt(dataArr[0]), parseInt(dataArr[1]) - 1, parseInt(dataArr[2]), 0,
      0, 0));
  }

}
