export const convertToSlug = text => {
  let slug;
  //Đổi chữ hoa thành chữ thường
  slug = text.toLowerCase();

  //Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  //Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    '',
  );
  //Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, '-');
  //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  //Xóa các ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  //In slug ra textbox có id “slug”
  return slug;
};

export const randomString = (
  len: number,
  an?: 'alphabet' | 'number' | 'both',
) => {
  let str = '';
  let i = 0;
  const min = an === 'alphabet' ? 10 : 0;
  const max = an === 'number' ? 10 : 62;
  for (; i++ < len; ) {
    let r = (Math.random() * (max - min) + min) << 0;
    str += String.fromCharCode((r += r > 9 ? (r < 36 ? 55 : 61) : 48));
  }
  return str;
};

export const convertLegalEntity = str => {
  let res = str.replace("/", '');
  res = res.replace("  ", '');
  res = res.split(" ");

  res = res.map(function(value, index, array){
    return value.charAt(0).toLocaleLowerCase() + value.slice(1);
  })
  return res.join('-');
};

export const revertLegalEntity = str => {
  let res = str.split("-");

  res = res.map(function(value, index, array){
    return value.charAt(0).toLocaleUpperCase() + value.slice(1);
  })
  return res.join(' ');
};

export const convertArrayToString = arr => {
  const result = []
  arr.forEach(function(value){
    result.push(value.message);
  })

  return result.join(', ');
};