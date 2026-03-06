let folderA = "C:/folderA";
let folderB = "C:/folderB";

const pathA = document.getElementById('pathA');
const pathB = document.getElementById('pathB');
pathA.innerText = folderA;
pathB.innerText = folderB;
const result = document.getElementById('result');

document.getElementById('folderA').onclick = async () => {

    folderA = await window.api.selectFolder();

    if(folderA)
        pathA.innerText = folderA;
};

document.getElementById('folderB').onclick = async () => {

    folderB = await window.api.selectFolder();

    if(folderB)
        pathB.innerText = folderB;
};

document.getElementById('scan').onclick = async () => {

    if(!folderA || !folderB){
        alert("Виберіть дві папки");
        return;
    }

    result.innerText = "Сканування...";

    const data = await window.api.scanFolders(folderA, folderB);

    let text = `
Файлів у папці A: ${data.filesA}
Файлів у папці B: ${data.filesB}

Ідентичні файли:
`;

    data.identical.forEach(f=>{
        text += `\n${f.fileA}\n${f.fileB}\n`;
    });

    result.innerText = text;

};