export class Data {
  constructor(
    imageName = '',
    year = '',
    quarter = '',
    use = '',
    gender = '',
    origin = '',
    base64 = '',
    user = ''
  ) {
    [

      this.imageName = imageName,
      this.year = year,
      this.quarter = quarter,
      this.use = use,
      this.gender = gender,
      this.origin = origin,
      this.base64 = base64,
      this.user = user
    ]
  }

  imageName: string;
  year: string;
  quarter: string;
  use: string;
  gender: string;
  origin: string;
  base64: string;
  user: string;
}
