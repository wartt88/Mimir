import Image from "next/image";
import type {ChangeEvent, DragEvent} from "react";
import {useState} from "react";

function DropButton(): JSX.Element {
    return <div className="border-2 border-black border-dashed w-fit p-10">
        <Image alt="Ajouter une carte" height={64} src="/addBlack.svg" width={64}/>
    </div>
}

function Loading(): JSX.Element {
    return <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status">
  <span
      className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
  >Loading...</span
  >
    </div>
}

interface GeneratePageProps {
    file: File | undefined,
    onClose: () => void,
    setData: (data: []) => void,
    setFile: (file: File|undefined) => void
}

const ERROR_PDF_FORMAT = "Vous n'acceptons que les fichiers sous format PDF (.pdf)";
const ERROR_SERVER = "Il y a eu une erreur de notre côté, veuillez réessayer";

export default function GeneratePage({file, onClose, setData, setFile}: GeneratePageProps): JSX.Element {

    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleDragOver = (event: DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>): void => {
        event.preventDefault();
        const droppedFiles = event.dataTransfer.files;
        if(droppedFiles && droppedFiles.length > 0) {
            const targetFile: File = droppedFiles[0];
            if (targetFile.name.endsWith(".pdf")) {
                setFile(targetFile);
                setError("")
            } else {
                setError(ERROR_PDF_FORMAT);
            }
        }
    };

    const handleFileBrowse = (event: ChangeEvent<HTMLInputElement>):void => {
        const selectedFiles = event.target.files;
        if (selectedFiles && selectedFiles.length > 0) {
            const targetFile: File = selectedFiles[0];
            if (targetFile.name.endsWith(".pdf")) {
                setFile(targetFile);
                setError("")
            } else {
                setError(ERROR_PDF_FORMAT);
            }
        }
    };

    const handleGenerate = (): void => {

        setLoading(true)

        const formData = new FormData();
        formData.append("file", file);
        formData.append("questions", 10);

        fetch(`/api/extractor`, {
            method: "POST",
            body: formData,
        }).then(response => response.json()
        ).then(data => {
            console.log("data: ", data);
            setData(data.resData);
            setLoading(false)
            setError("");
            onClose();
        }).catch((err) => {
            setLoading(false);
            setError(ERROR_SERVER);
            console.error(err);
        });
    }

    const handleCancel = (): void => {
        setFile(undefined);
        setError("");
    }

    let fileRender: JSX.Element;
    if (file) {
        fileRender = <div className="flex flex-col items-center space-y-3">
            <div className="flex space-x-5 items-center">
                <Image alt="Fichier PDF" height={64} src="/pdf.png" width={64}/>
                <p>{file.name}</p>
            </div>
            <div className="flex space-x-3">
                <button className="flex items-center gap-2 bg-blue-500 px-5 py-3 text-white font-Lexend rounded-lg"
                        disabled={loading} onClick={handleGenerate}>
                    {loading ? <Loading/> : null}
                    Générer
                </button>
                <button className="bg-gray-500 px-5 py-3 text-white font-Lexend rounded-lg"
                        onClick={handleCancel}>Retirer le fichier
                </button>
            </div>
        </div>
    } else {
        fileRender = <>
            <label htmlFor="browse">
                <DropButton/>
            </label>
            <input accept=".pdf" hidden id="browse" onChange={handleFileBrowse} type="file"/>
        </>
    }

    return (
        <div className="flex flex-col items-center space-y-8" onDragOver={handleDragOver} onDrop={handleDrop}>
            <h1 className="font-Lexend text-2xl font-medium">Générez vos cartes grâce à l'IA*</h1>
            {fileRender}
            {error ? <p className="bg-red-500 text-white font-Lexend text-sm px-3 py-2 rounded-lg">{error}</p> : null}
            <p className="font-Lexend text-sm">* Cette fonctionnalité est en bêta et peut comporter des erreurs,
                vous devez vérifier les cartes générés, les trier et les corriger si nécessaire</p>
        </div>
    );
}