# Horizon: Personalized Shopping Discounts

Horizon is a prototype browser extension developed for the Request Network Hackathon. It revolutionizes online shopping by offering personalized discounts based on users' purchase history, securely processed through the Request Network. This project showcases a working prototype alongside an example e-commerce coffee store for demonstration purposes.

---

## **Features**
- **Personalized Discounts**: Automatically match discounts to users' purchase history stored on the Request Network.  
- **Secure Data Handling**: Purchase data is encrypted to prioritize privacy.  
- **Prototype Status**: Includes a demo coffee store to demonstrate functionality.  

---

## **Getting Started**

### **Prerequisites**
- Node.js (latest stable version)
- A Chromium-based browser (e.g., Chrome, Edge) for loading the extension.

### **Installation**

#### 1. **Browser Extension**
1. Navigate to the `extension` directory:
   ```bash
   cd extension
   ```
2. Install dependencies with the `--force` flag:
   ```bash
   npm install --force
   ```
   > **Note**: The `--force` flag resolves some Vite plugin dependency issues. These issues do not affect the prototype's performance.
3. Build the extension:
   ```bash
   npm run build
   ```
4. Load the extension in your browser:
   - Open your browser's extensions page.
   - Enable **Developer Mode**.
   - Click **Load Unpacked** and select the `build` directory.

#### 2. **Example Coffee Store**
1. Navigate to the `store` directory:
   ```bash
   cd store
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

---

## **Future Improvements**
Horizon is currently a functional prototype. Features planned for future development include:
- **Manual Invoice Digitization**: Upload and match invoices for discount eligibility.
- **Wallet Integration**: Extend the extension as a MetaMask Snap to handle payments via the Request Network.
- **Enhanced Privacy**: Advanced key handling for improved encryption.  

---

## **Limitations**
This project was developed during a hackathon and is not production-ready. Expect limited features and prototype-specific constraints.  

---

## **Tech Stack**
- **Extension**: React with Vite  
- **Demo Store**: Next.js (clone of Request Network Checkout template)  
- **UI Library**: Chakra UI  
- **Blockchain**: Request Network for purchase history storage and encryption  

---

## **Acknowledgments**
This project was built as part of the Request Network Hackathon. Special thanks to the Request Network team for their support and documentation.  

Feel free to contribute or fork the repository!