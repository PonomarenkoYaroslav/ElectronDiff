

const { FileTree } = require('./fileTree');

const { app, BrowserWindow } = require('electron');

//app.commandLine.appendSwitch('disable-webgl2');       // Disable WebGL 2
//app.commandLine.appendSwitch('use-gl', 'angle');      // Use GLES / EGL
//app.commandLine.appendSwitch('ignore-gpu-blacklist'); // Allow old GPUs
//app.commandLine.appendSwitch('use-angle', 'd3d9')     // Optional: force Direct3D 9 if GPU is old

app.commandLine.appendSwitch('disable-gpu')             // disables hardware acceleration
app.commandLine.appendSwitch('disable-gpu-compositing')
app.commandLine.appendSwitch('disable-d3d11')           // optional: disable Direct3D 11
app.commandLine.appendSwitch('disable-webgl2')          // force WebGL1
app.commandLine.appendSwitch('ignore-gpu-blacklist')    // allow SwiftShader on old GPUs



function createWindow()
{
  const win = new BrowserWindow({

   width: 800,
   height: 600,
   webPreferences: {
   nodeIntegration: true
    }
  
   })

 

   win.loadURL('data:text/html;charset=utf-8,' + encodeURIComponent(`

    <h1>Electron Renderer Info</h1>
    <pre id="info"></pre>

    <script>
      const infoEl = document.getElementById('info');

      function addLine(str) {
        infoEl.textContent += str + '\\n';
      }

      // WebGL2 / GLES3

      let gl2 = document.createElement('canvas').getContext('webgl2');
      // WebGL1 / GLES2 fallback

      let gl1 = document.createElement('canvas').getContext('webgl') || document.createElement('canvas').getContext('experimental-webgl');


      if(gl2) {
        addLine("Context: WebGL 2 / GLES 3");
        addLine("GL Version: " + gl2.getParameter(gl2.VERSION));
        addLine("Shading Language: " + gl2.getParameter(gl2.SHADING_LANGUAGE_VERSION));
        addLine("Vendor: " + gl2.getParameter(gl2.VENDOR));
        addLine("Renderer: " + gl2.getParameter(gl2.RENDERER));
        addLine("Max Texture Size: " + gl2.getParameter(gl2.MAX_TEXTURE_SIZE));

      } else if(gl1) {
        addLine("Context: WebGL 1 / GLES 2");
        addLine("GL Version: " + gl1.getParameter(gl1.VERSION));
        addLine("Shading Language: " + gl1.getParameter(gl1.SHADING_LANGUAGE_VERSION));
        addLine("Vendor: " + gl1.getParameter(gl1.VENDOR));
        addLine("Renderer: " + gl1.getParameter(gl1.RENDERER));
        addLine("Max Texture Size: " + gl1.getParameter(gl1.MAX_TEXTURE_SIZE));
      }
	else {
        addLine("No WebGL context available!");
      }

      // List supported extensions

      const exts = gl2 ? gl2.getSupportedExtensions() : gl1 ? gl1.getSupportedExtensions() : [];
      addLine("\\nSupported Extensions: " + (exts ? exts.join(', ') : "None"));
    </script>
  `));
}



app.whenReady().then(createWindow)



app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()

})


(async () => {
    const treeA = new FileTree('C:/folderA');
    const treeB = new FileTree('C:/folderB');

    await treeA.build();
    await treeB.build();

    console.log('Tree A files:', treeA.pathMap.size);
    console.log('Tree B files:', treeB.pathMap.size);
})();