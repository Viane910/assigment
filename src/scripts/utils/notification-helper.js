export function isNotificationAvailable(){
    return 'Notification' in window;
}

export function isNotificationGranted(){
    return Notification.permission === 'granted';
}

export async function requestNotificationPermission(){
    if (!isNotificationAvailable()) {
        console.error('Notification API unsupported');
        return false;
    }

    if (isNotificationGranted()) {
        return true;
    }

    const status = await Notification.requestPermission();
}