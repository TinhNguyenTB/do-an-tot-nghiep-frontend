/**
 * Định dạng số tiền thành chuỗi tiền tệ Việt Nam (VND).
 * * @param value Số tiền cần định dạng (kiểu number hoặc string).
 * @returns Chuỗi đã được định dạng (ví dụ: "1.000.000 ₫").
 */
export const formatVND = (value: number | string): string => {
  // Đảm bảo giá trị là số trước khi định dạng
  const numberValue = typeof value === 'string' ? parseFloat(value) : value

  if (isNaN(numberValue)) {
    return '0 ₫' // Trả về giá trị mặc định nếu không phải là số hợp lệ
  }

  // Khởi tạo đối tượng NumberFormat với locale 'vi-VN' và currency 'VND'
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    // Bỏ phần thập phân vì tiền Việt Nam thường dùng số nguyên
    minimumFractionDigits: 0
  })

  return formatter.format(numberValue)
}
