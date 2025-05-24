/**
 * 日期格式化工具类
 */
export class DateUtil {
    /**
     * 将日期格式化为 yyyy-MM-dd HH:mm:ss
     * @param date 日期对象
     * @returns 格式化后的日期字符串
     */
    static formatDateTime(date: Date): string {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    /**
     * 将日期格式化为 yyyy-MM-dd
     * @param date 日期对象
     * @returns 格式化后的日期字符串
     */
    static formatDate(date: Date): string {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')

        return `${year}-${month}-${day}`
    }

    /**
     * 将日期字符串转换为Date对象
     * @param dateStr 日期字符串 (yyyy-MM-dd HH:mm:ss 或 yyyy-MM-dd)
     * @returns Date对象
     */
    static parseDate(dateStr: string): Date {
        return new Date(dateStr)
    }
} 