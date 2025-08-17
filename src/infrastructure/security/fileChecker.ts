import net from 'net'

import fs from 'fs'


export const fileScan = async (filePath: string) => {
    // setup the connection with tcp client
    return new Promise((resolve, reject) => {
        const client = net.createConnection({ port: 3310, host: "127.0.0.1" }, () => {
            // create a connection to the ClamAv daemon to avoid store in ram
            const stream = fs.createReadStream(filePath)
            client.write('zINSTREAM\0') // send the file to clamav to scan by chunks
            stream.on('data', (chunk) => {
                const lengthBuffer = Buffer.alloc(4)
                lengthBuffer.writeUInt32BE(chunk.length, 0)
                client.write(lengthBuffer) // send the length of the chunk
                client.write(chunk) // send the chunk
            })
            stream.on('end', () => {
                const endBuffer = Buffer.alloc(4)
                endBuffer.writeUInt32BE(0, 0) // send the end of the stream
                client.write(endBuffer)
            })
            client.on("data", (data) => {
                const response = data.toString();
                resolve(response);
                client.end();
            });
            client.on("error", reject);
        })
    })
} g