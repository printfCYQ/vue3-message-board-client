import dayjs from 'dayjs';

export const formatTime = (time: string) => {
    let timeStr = dayjs(new Date(time)).format()
    return timeStr.substring(0, 10) + ' ' + timeStr.substring(11, 19)
}