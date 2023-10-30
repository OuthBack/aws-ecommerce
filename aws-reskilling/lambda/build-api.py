import boto3
import os
import subprocess

def handler(event, context):
    # Get commit details from event
    repository_name = event['detail']['repositoryName']
    commit_id = event['detail']['afterCommitId']
    
    # Clone the repository (consider using AWS CodeCommit's boto3 API for this)
    clone_command = f"git clone https://git-codecommit.us-east-1.amazonaws.com/v1/repos/{repository_name}"
    subprocess.check_call(clone_command, shell=True)

    # Change to repository directory
    os.chdir(repository_name)

    # Build the Docker image
    image_name = "585934845312.dkr.ecr.us-east-1.amazonaws.com/ecommerce:latest"
    build_command = f"docker build -t {image_name} ."
    subprocess.check_call(build_command, shell=True)

    # Push the Docker image to ECR
    push_command = f"docker push {image_name}"
    subprocess.check_call(push_command, shell=True)
    print(f'Image {image_name} pushed successfully!')

    return {
        'statusCode': 200,
        'body': f"Image {image_name} pushed successfully!"
    }
