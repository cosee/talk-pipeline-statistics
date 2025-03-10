

const redImage =
    new URL("./pexels-chevanon-1108116.jpg", import.meta.url).pathname;

const redBlueImage =
    new URL("./pexels-chevanon-1108116-blue-red.jpg", import.meta.url).pathname;

const grayImage = new URL("./cosee-background.png", import.meta.url).pathname;


export function getImage(lastStatus: string, lastFinishedStatus: string): string {
    if (lastFinishedStatus === "failed") {
        if (lastStatus === "failed") {
            return redImage
        }
        return redBlueImage
    }
    return grayImage
}