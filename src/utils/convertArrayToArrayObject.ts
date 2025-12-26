/**
 * Chuyển đổi một mảng các giá trị cơ bản (ví dụ: string, number) thành một mảng các đối tượng,
 * trong đó mỗi đối tượng có một khóa (key) định trước chứa giá trị ban đầu.
 *
 * @template T Giá trị cơ bản của mảng đầu vào (ví dụ: string, number, v.v.).
 * @param array Mảng các giá trị cần chuyển đổi.
 * @param key Khóa (key) mà bạn muốn sử dụng trong đối tượng (mặc định là 'name').
 * @returns Mảng các đối tượng có cấu trúc { [key]: T }.
 */
export function convertArrayToArrayObject<T>(
  array: T[],
  key: string = 'name'
): Array<{ [K: string]: T }> {
  // Đảm bảo đầu vào là một mảng
  if (!Array.isArray(array)) {
    console.error('Đầu vào phải là một mảng.')
    return []
  }

  // Sử dụng phương thức map để duyệt qua từng phần tử và tạo đối tượng mới
  return array.map((item) => {
    return {
      [key]: item // Sử dụng cú pháp Computed Property Name để đặt tên key linh hoạt
    } as { [K: string]: T }
  })
}
