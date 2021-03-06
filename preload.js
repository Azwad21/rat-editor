console.log("Consoled from preload");

const {
    contextBridge,
    ipcRenderer
} = require("electron");

contextBridge.exposeInMainWorld(
    "ipcRenderer", {
    send: (channel, data) => {
        // whitelist channels
        // let validChannels = ["toMain"];
        // if (validChannels.includes(channel)) {
        //     ipcRenderer.send(channel, data);
        // }
        ipcRenderer.send(channel, data);
    },
    on: (channel, func) => {
        let validChannels = ["path:data"];
        if (validChannels.includes(channel)) {
            // Deliberately strip event as it includes `sender` 
            ipcRenderer.on(channel, (event, ...args) => func(...args));
        }
        // ipcRenderer.on(channel, (event, ...args) => func(...args));
    }
}
);