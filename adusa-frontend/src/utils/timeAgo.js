export function timeAgo(str){ //may be in future I need some another function as well that's why named export 
    const postTime = new Date(str).getTime();
    const diffMilliSeconds = Date.now()-postTime;
    const totalMinute = Math.floor(diffMilliSeconds/(60*1000)) // 1 minute = 60 sec, 1sec = 1000ms means 1 minute = 60*1000ms 
    if(totalMinute<1)
        return "just now"
    else if (totalMinute<60)
        return `${totalMinute}m ago`
    else if(totalMinute<(24*60)) // 1 day 
        {
            const hour = Math.floor(totalMinute/60)
            return `${hour}h ago`
        }
    else if(totalMinute<(30*24*60))
    {
        const day = Math.floor(totalMinute/(24*60))
        return `${day}d ago`
    }
    else{
        const month = Math.floor(totalMinute/(30*24*60))
        return `${month}mo ago`
    }
}