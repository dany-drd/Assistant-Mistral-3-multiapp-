# PowerPoint Add-In

This repository contains a PowerPoint Add-In built using the Office JavaScript API. The add-in enhances PowerPoint functionality with custom features.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Development](#development)
  - [Running Locally](#running-locally)
  - [Sideloading the Add-In in PowerPoint](#sideloading-the-add-in-in-powerpoint)
- [Deployment](#deployment)
  - [Hosting the Add-In](#hosting-the-add-in)


---

## Prerequisites

1. **Node.js and npm**: Install [Node.js](https://nodejs.org/) and npm.
2. **PowerPoint**: Ensure you have PowerPoint installed (desktop or web).
3. **HTTPS**: Ensure your development server runs on HTTPS, as PowerPoint requires a secure endpoint.

---

## Development

#### Run the Local Development Server
Ensure the HTTPS server is running by executing the following command:
bash
- npm start

### Sideload the Add-In

-PowerPoint doesn’t load add-ins directly from localhost. To test your add-in, you need to sideload it.

#### 1. Sideloading Steps for Desktop (Windows):
-use this link to make a shared folder URL
https://learn.microsoft.com/en-us/office/dev/add-ins/testing/create-a-network-shared-folder-catalog-for-task-pane-and-content-add-ins
- Open PowerPoint.
- Navigate to File > Options > Trust Center > Trust Center Settings > Trusted Add-in Catalogs.
- Add the following URL to the trusted catalog:

#### 2. Sideloading Steps for Desktop (Mac):
- Open PowerPoint.
- Go to **PowerPoint > Preferences > Ribbon and Toolbar > Developer Tab**.
- Enable the **Developer Tab**.
- In PowerPoint, go to **Developer > Add-ins > Upload My Add-in**, and select the `manifest.xml` file located in your project root.

#### 3. Sideloading Steps for Web (Office 365):
- Open PowerPoint in your web browser.
- Navigate to **Insert > Add-ins > Upload My Add-in**.
- Upload the `manifest.xml` file located in your project root.

-For more information about sideloading Office Add-ins, refer to the official documentation: [Sideload Office Add-ins](https://learn.microsoft.com/en-us/office/dev/add-ins/testing/sideload-office-add-ins-for-testing).



## Hosting the Addin

## Deployment Preparation

Before you can host your add-in, ensure the following:
- Your add-in is built and tested locally.
- Your manifest file is updated with the correct URLs for the add-in’s hosted location.
- Your web server supports HTTPS.
- Use 'npm run build' to make build.

## Hosting the Add-in

You can host your Office Add-in on any modern web hosting platform. Below are examples of how to host on different platforms.

### Choose a Hosting Provider

Here are some popular hosting providers to consider:

- **[Azure App Services](https://azure.microsoft.com/en-us/services/app-service/)**
- **[Amazon Web Services (AWS)](https://aws.amazon.com)**
- **[Google Cloud Platform (GCP)](https://cloud.google.com)**

Choose the one that best fits your requirements.

### Host on Azure

#### Step 1: Create an Azure Account
- If you don’t have an Azure account, sign up at [Azure](https://azure.microsoft.com).
  
#### Step 2: Create a Web App in Azure
1. In the Azure portal, go to **App Services** and create a new Web App.
2. Choose the appropriate plan and region.
3. Select HTTPS for secure connections.

#### Step 3: Upload Add-in Files
- Upload your HTML, JavaScript, and CSS files using Git, FTP, or Azure DevOps.

#### Step 4: Configure SSL
- Azure provides SSL for your default domain (e.g., `yourapp.azurewebsites.net`).
- You can also configure a custom domain with SSL certificates.

#### Step 5: Update the Manifest
Modify the manifest file to point to the Azure hosted URL:
```xml
<SourceLocation resid="taskpaneUrl" />
<bt:ShortString bt:val="https://your-app-name.azurewebsites.net/youraddin.html" />





