# Docker Publish Script for BazarZone Frontend

$IMAGE_NAME = "bazarzone-frontend"
$TAG = "latest"
$REGISTRY = "your-registry-url" # e.g., myregistry.azurecr.io
$FULL_IMAGE_NAME = "$REGISTRY/$IMAGE_NAME:$TAG"

Write-Host "Building Docker image: $FULL_IMAGE_NAME..."
docker build -t $FULL_IMAGE_NAME .

if ($LASTEXITCODE -eq 0) {
    Write-Host "Build successful."
    
    # Uncomment the following lines to push to a registry
    # Write-Host "Pushing image to registry..."
    # docker push $FULL_IMAGE_NAME
    
    # if ($LASTEXITCODE -eq 0) {
    #     Write-Host "Push successful."
    # } else {
    #     Write-Error "Push failed."
    # }
} else {
    Write-Error "Build failed."
}
