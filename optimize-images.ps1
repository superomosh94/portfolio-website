# PowerShell script to optimize images for web
# Requires ImageMagick to be installed: choco install imagemagick
# Or download from: https://imagemagick.org/script/download.php#windows

$sourceDir = ".\resource"
$publicSourceDir = ".\public\resource"
$dirs = @($sourceDir, $publicSourceDir)

foreach ($dir in $dirs) {
    if (Test-Path $dir) {
        Write-Host "Processing images in: $dir"
        
        # Get all image files
        $images = Get-ChildItem -Path $dir -Include *.png, *.jpg, *.jpeg -Recurse
        
        foreach ($image in $images) {
            $fullPath = $image.FullName
            $parentDir = $image.DirectoryName
            $baseName = $image.BaseName
            $extension = $image.Extension.ToLower()
            
            Write-Host "Processing: $($image.Name)"
            
            # Create WebP version
            $webpPath = Join-Path $parentDir "$baseName.webp"
            $magickCmd = "magick `"$fullPath`" -quality 80 -strip `"$webpPath`""
            Invoke-Expression $magickCmd
            
            # Compress original
            if ($extension -eq ".png") {
                $magickCmd = "magick `"$fullPath`" -strip -quality 85 `"$fullPath`""
            } else {
                $magickCmd = "magick `"$fullPath`" -quality 80 -strip `"$fullPath`""
            }
            Invoke-Expression $magickCmd
            
            $originalSize = $image.Length / 1KB
            $webpSize = (Get-Item $webpPath).Length / 1KB
            Write-Host "  Original: $([Math]::Round($originalSize, 2))KB -> WebP: $([Math]::Round($webpSize, 2))KB"
        }
    }
}

Write-Host "Image optimization complete!"
