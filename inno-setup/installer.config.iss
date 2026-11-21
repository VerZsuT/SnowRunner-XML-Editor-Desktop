#define MyAppName "SnowRunnerXMLEditor"
#define MyAppVersion "1.4.0"
#define MyAppPublisher "VerZsuT"
#define MyAppURL "https://snowrunner.mod.io/guides/snowrunner-xml-editor/"
#define MyAppExeName "SnowRunnerXMLEditor.exe"

[Setup]
AppId={{A9C12A97-351E-453E-B121-A2B1A1D5B56D}
AppName={#MyAppName}
AppVersion={#MyAppVersion}
AppPublisher={#MyAppPublisher}
AppPublisherURL={#MyAppURL}
AppSupportURL={#MyAppURL}
AppUpdatesURL={#MyAppURL}
DefaultDirName={autopf}\{#MyAppName}
DefaultGroupName={#MyAppName}
OutputDir="..\out"
OutputBaseFilename={#MyAppName}
SetupIconFile="..\out\{#MyAppName}\resources\app\.vite\favicon.ico"
AppReadmeFile="..\out\{#MyAppName}\resources\app\.vite\README.md"
LicenseFile="..\out\{#MyAppName}\resources\app\.vite\LICENSE"
SolidCompression=yes
WizardStyle=modern
PrivilegesRequired=admin

[Languages]
Name: "en"; MessagesFile: "compiler:Default.isl"
Name: "de"; MessagesFile: "compiler:Languages/German.isl"
Name: "ru"; MessagesFile: "compiler:Languages/Russian.isl"

[Files]
Source: "..\out\{#MyAppName}\*"; DestDir: "{app}"; Flags: ignoreversion recursesubdirs createallsubdirs

[Icons]
Name: "{autodesktop}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\{#MyAppName}"; Filename: "{app}\{#MyAppExeName}"
Name: "{group}\Uninstall {#MyAppName}"; Filename: "{uninstallexe}"

[Run]
Filename: "{app}\{#MyAppExeName}"; Description: "{cm:LaunchProgram,{#StringChange(MyAppName, '&', '&&')}}"; Flags: nowait postinstall skipifsilent runascurrentuser

[UninstallDelete]
Name: "{app}\resources"; Type: filesandordirs

