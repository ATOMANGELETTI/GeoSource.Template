param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("Agent", "Workflow", "Command", "Skill")]
    [string]$Type,

    [Parameter(Mandatory=$true)]
    [string]$Name
)

$ErrorActionPreference = "Stop"
$ScriptDir = Split-Path $MyInvocation.MyCommand.Path -Parent
$AgentsDir = Resolve-Path (Join-Path $ScriptDir "..")
$TemplatesDir = Join-Path $AgentsDir "data\templates"

# Output configuration
Write-Host "=== GeoSource Scaffold Utility ===" -ForegroundColor Cyan
Write-Host "Type: $Type"
Write-Host "Name: $Name"
Write-Host "Base: $AgentsDir"

function CreateFromTemplate {
    param($TemplateName, $DestDir, $DestFile, $ReplaceDict)
    
    $TemplatePath = Join-Path $TemplatesDir $TemplateName
    if (-not (Test-Path $TemplatePath)) {
        Write-Error "Template $TemplateName not found."
    }
    
    $Content = Get-Content $TemplatePath -Raw
    foreach ($Key in $ReplaceDict.Keys) {
        $Content = $Content -replace $Key, $ReplaceDict[$Key]
    }
    
    $DestPath = Join-Path $AgentsDir $DestDir
    if (-not (Test-Path $DestPath)) {
        New-Item -ItemType Directory -Force -Path $DestPath | Out-Null
    }
    
    $FinalPath = Join-Path $DestPath $DestFile
    if (Test-Path $FinalPath) {
        Write-Error "File $FinalPath already exists!"
    }
    
    Set-Content -Path $FinalPath -Value $Content
    Write-Host "  [+] Created: $FinalPath" -ForegroundColor Green
    return $FinalPath
}

switch ($Type) {
    "Agent" {
        $Dict = @{
            "\[agent-id\]" = $Name
            "\[Agent Title\]" = (CultureInfo).TextInfo.ToTitleCase($Name.Replace('-', ' '))
        }
        $Created = CreateFromTemplate "agent-template.md" "agents" "$Name.md" $Dict
        
        # Create log file
        $LogPath = Join-Path $AgentsDir "memory\$Name-log.md"
        Set-Content -Path $LogPath -Value "# $((CultureInfo).TextInfo.ToTitleCase($Name.Replace('-', ' '))) Log`n"
        Write-Host "  [+] Created: $LogPath" -ForegroundColor Green
    }
    "Workflow" {
        $Dict = @{
            "\[Workflow Name\]" = (CultureInfo).TextInfo.ToTitleCase($Name.Replace('-', ' '))
        }
        $Created = CreateFromTemplate "workflow-template.md" "workflows" "$Name.md" $Dict
    }
    "Command" {
        $Dict = @{
            "\[command\]" = $Name
        }
        $Created = CreateFromTemplate "command-template.md" "commands" "$Name.md" $Dict
    }
    "Skill" {
        $Dict = @{
            "\[skill-name\]" = $Name
            "\[Skill Name\]" = (CultureInfo).TextInfo.ToTitleCase($Name.Replace('-', ' '))
        }
        $Created = CreateFromTemplate "skill-template.md" "skills\$Name" "SKILL.md" $Dict
    }
}

Write-Host "=== Scaffold Complete ===" -ForegroundColor Cyan
