import { Injectable } from "@angular/core"

@Injectable({
    providedIn: 'root'
})
export class FileService {

    async fileUpload(event: any) {
        const file: [string, string] = ['', '']
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            }
            reader.onerror = error => reject(error)
        })
        const result = await toBase64(event.files[0])

        const resultStr = result.substring(result.indexOf(",") + 1, result.length)
        const resultExt = result.substring(result.indexOf("/") + 1, result.indexOf(";"))
        file[0] = resultExt
        file[1] = resultStr

        return file
    }

    async fileUploadForDeletion(event: any) {
        const file: [string, string] = ['', '']
        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            }
            reader.onerror = error => reject(error)
        })
        const result = await toBase64(event.file)

        const resultStr = result.substring(result.indexOf(",") + 1, result.length)
        const resultExt = result.substring(result.indexOf("/") + 1, result.indexOf(";"))
        file[0] = resultExt
        file[1] = resultStr

        return file
    }

    async fileUploadMulti(event: any) {
        const files: [string, string][] = []

        const toBase64 = (file: File) => new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                if (typeof reader.result === "string") resolve(reader.result)
            }
            reader.onerror = error => reject(error)
        })

        for (let i = 0; i < event.files.length; i++) {
            const file: [string, string] = ['', '']
            const result = await toBase64(event.files[i])

            const resultStr = result.substring(result.indexOf(",") + 1, result.length)
            const resultExt = result.substring(result.indexOf("/") + 1, result.indexOf(";"))

            file[0] = resultExt
            file[1] = resultStr

            files.push(file)
        }

        return files
    }
}