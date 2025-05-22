//line 303//
        <div v-else class="expenses-container">
          <h3><i class="fas fa-coins"></i> <span>GROUP EXPENSES</span></h3> 
          <div class="expenses-section"> 
            <div class="expenses-table"> 


<style scoped>
.image-container {
  width: 100%;
  height: 250px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
  position: relative;
}

.image-container img {
  max-width: 100%;
  max-height: 100%;
  transition: transform 0.2s ease;
  transform-origin: center center;
}

.zoom-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 15px;
}

.zoom-btn {
  background: #f0f0f0;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
  transition: background 0.2s;
}

.zoom-btn:hover {
  background: #e0e0e0;
}

.photo-view-modal .modal-content5 {
  max-width: 800px;
}
/* Photos Tab Styles */
.modal-overlay5 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content5 {
  background-color: #f9fefc;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  margin: 60px auto;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  max-height: 90vh; 
}

.modal-header5 {
  padding: 35px 30px; 
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 3px solid #4f7a6b;
  background: linear-gradient(135deg, #8bbcae, #6a9c89);
  box-shadow: inset 0 -4px 6px rgba(0,0,0,0.1);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.modal-header5 h3 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 1.6rem;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}
.modal-header5 .close-button {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #e4f9e4;
  transition: color 0.3s ease;
  padding: 5px;
  border-radius: 50%;
}

.modal-header5 .close-button:hover {
  color: #f9fefc;
  background: rgba(255, 255, 255, 0.15);
}

.modal-body5 {
  padding: 16px 20px;
  background-color: #f7feff; 
}

.form-group5 {
  margin-bottom: 15px;
}

.form-group5 label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #4f7a6b;
}

.form-group5 textarea {
  width: 100%;
  max-width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  height: 60px;
}

.form-group5 input {
  width: 96%;
  padding: 8px;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
}
.photos-tab {
  padding: 20px;
}

.photos-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-top: -40px;
  margin-bottom: 20px;
}

.upload-photo-btn {
  background: linear-gradient(135deg, #9bd2c2, #72aa95, #649b87);
  color: white;
  font-size: 14px;
  border: none;
  padding: 10px 30px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background 0.3s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.307);
}

.upload-photo-btn:hover {
  background: linear-gradient(135deg, #b9e1d5, #a7d2c6, #8bbcae);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.15);
}

.photos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.photo-card {
  border: 2px solid #4f7a6b;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.photo-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

.photo-wrapper {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.photo-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s;
}

.photo-thumbnail:hover {
  transform: scale(1.05);
}

.photo-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  cursor: pointer;
}

.photo-actions {
  position: absolute;
  top: 10px;
  right: 10px;
}

.delete-photo-btn {
  background-color: rgba(255,0,0,0.7);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-meta {
  padding: 10px;
  background: #f5fbf9; /* very light greenish background */
  border: 1px solid #d6e8e2;
  border-radius: 6px;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.03);
  font-family: 'Segoe UI', sans-serif;
}


.photo-description {
  margin: 0 0 10px 0;
  font-weight: 500;
  font-size: 14px;
  color: #4f7a6b;
  font-style: italic;
  letter-spacing: 0.3px;
}

.photo-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: #666;
}


.photo-uploader, .photo-date {
  font-size: 13px;
  color: #666;
  margin: 3px 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* Photo Upload Modal */
.photo-upload-modal {
  max-width: 500px;
}

.photo-preview {
  margin-top: 10px;
  max-height: 300px;
  overflow: hidden;
}

.photo-preview img {
  width: 100%;
  height: auto;
  max-height: 100px;
  object-fit: contain;
}

/* Photo View Modal */
.photo-view-modal .modal-content5 {
  max-width: 60%;
  max-height: 90vh;
}

.photo-view-modal img {
  max-width: 100%;
  max-height: 50vh;
  display: block;
  margin: 0 auto;
}

.photo-details {
  margin-top: 15px;
  padding: 12px 16px;
  background: linear-gradient(135deg, #eef9f5, #d9f2ea); 
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  font-size: 14px;
  color: #3c4c47;
  transition: background 0.3s ease;
}

.no-photos {
  text-align: center;
  padding: 40px;
  color: #4f7a6b;
  background: linear-gradient(135deg, #f0f9f6, #e5f3ef);
  border: 2px dashed #8bbcae;
  border-radius: 8px;
  font-size: 1.1em;
  font-style: italic;
  box-shadow: inset 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: background 0.3s ease;
}

.close-button2 {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #1a1a1a; /* deep black for a sleek look */
  transition: transform 0.2s ease, opacity 0.2s ease;
  opacity: 0.8;
}

.close-button2:hover {
  transform: translateY(-50%) scale(1.2);
  opacity: 1;
}

/* Voice Input Styles */
.voice-help-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.voice-help-content {
  background-color: #fefefe;
  border-radius: 16px;
  width: 90%;
  max-width: 440px;
  max-height: 70vh; 
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  animation: modalFadeIn 0.3s ease-out;
  font-family: "Segoe UI", sans-serif;
  display: flex;
  flex-direction: column;
}


.voice-help-header {
  background: linear-gradient(135deg, #8bbcae, #6a9c89, #4f7a6b);
  color: white;
  padding: 14px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.voice-help-header h3 {
  margin: 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 10px;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.3rem;
  cursor: pointer;
  padding: 5px;
  transition: transform 0.2s;
}

.close-btn:hover {
  transform: scale(1.2);
}

.voice-help-body {
  padding: 18px 20px;
  max-height: 55vh;
  overflow-y: auto;
}

.voice-command {
  display: flex;
  margin-bottom: 15px;
  align-items: flex-start;
}

.command-prefix {
  font-size: 1.4rem;
  color: #6a9c89;
  margin-right: 12px;
}

.command-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.command-example {
  font-weight: 600;
  color: #4f7a6b;
  font-family: 'Courier New', monospace;
  font-size: 0.93rem;
}

.command-description {
  color: #555;
  font-size: 0.88rem;
}

.voice-help-footer {
  padding: 14px 20px;
  background-color: #f0f2f1;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #ddd;
}

.btn-ok {
  background-color: #6a9c89;
  color: white;
  border: none;
  padding: 8px 18px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s, transform 0.2s;
}

.btn-ok:hover {
  background-color: #4f7a6b;
  transform: translateY(-2px);
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.voice-help-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: linear-gradient(135deg, #8bbcae, #6a9c89, #4f7a6b);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  z-index: 100;
  font-size: 0.9rem;
}

.voice-help-btn:hover {
  background: #8bbcae;
}

/* Animation */
@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive adjustments */
@media (max-width: 600px) {
  .voice-help-content {
    width: 95%;
  }
  
  .command-details {
    flex-direction: column;
  }
}
.input-with-voice {
  position: relative;
  display: flex;
  align-items: center;
}

.voice-btn {
  background: #f0f0f0;
  border: 1px solid  #6a9c89;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  margin-left: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.voice-btn:hover {
  color: #42b983;
}

.voice-btn.active {
  background: #ff4444;
  color: white;
  animation: pulse 1.5s infinite;
}

.voice-controls {
  margin-top: 20px;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
}

.voice-control-btn {
  padding: 10px 15px;
  background: #4285f4;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
}

.voice-control-btn.active {
  background: #ff4444;
}

.voice-feedback {
  margin-top: 10px;
  padding: 10px;
  background: white;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.voice-input-preview {
  font-style: italic;
  color: #666;
}

.voice-help-text {
  font-size: 0.8em;
  color: #999;
  margin-top: 5px;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}
.no-budget {
  background-color: #f4f8f6;
  border: 1px dashed #b6cfc5;
  padding: 16px 24px;
  border-radius: 8px;
  text-align: center;
  color: #4e7e6a;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  margin-top: 20px;
}

.no-budget p {
  margin: 0;
  font-size: 1rem;
}
.no-contributions {
  background-color: #f0f7f4;
  border: 1px solid #c8e3d5;
  border-radius: 12px;
  padding: 20px;
  margin: 20px auto;
  max-width: 500px;
  text-align: center;
  color: #2a4935;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  font-weight: 500;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
}
.button-edit, .button-delete {
  padding: 6px 14px;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.2s;
  min-width: 70px;
}

/* Edit button - your greenish color */
.button-edit {
  background: linear-gradient(135deg, #8bbcae, #6a9c89, #4f7a6b);
  color: white;
  box-shadow: 0 2px 5px rgba(106, 156, 137, 0.4);
}

.button-edit:hover:not(:disabled) {
  background: linear-gradient(135deg, #7aa98c, #5e8873, #486858);
  box-shadow: 0 4px 10px rgba(74, 109, 92, 0.6);
}

/* Delete button - complementary red */
.button-delete {
  background: linear-gradient(135deg, #e57373, #d32f2f, #b71c1c);
  color: white;
  box-shadow: 0 2px 5px rgba(211, 47, 47, 0.4);
}

.button-delete:hover:not(:disabled) {
  background: linear-gradient(135deg, #d32f2f, #b71c1c, #7f0000);
  box-shadow: 0 4px 10px rgba(123, 0, 0, 0.6);
}

/* Disabled state for both buttons */
.button-edit:disabled,
.button-delete:disabled {
  cursor: not-allowed;
  opacity: 0.5;
  box-shadow: none;
  background: #ccc;
  color: #666;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}



.modal-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.form-control {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.con-contribution {
  background: linear-gradient(135deg, #f5fbf8, #e8f7ef);
  border: 2px solid #a8e0ce;
  border-radius: 16px;
  padding: 30px 40px;
  width: 100%;
  max-width: 450px;
  margin: 100px auto;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 10px 28px rgba(44, 88, 73, 0.08);
  text-align: left;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.con-contribution h3 {
  font-size: 1.4rem;
  font-weight: 700;
  color: #2a4935;
  margin-bottom: 20px;
  margin-top: 0px;
}

.btn-save-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.btn-save {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #82b1a3, #699b88, #476e60);
  color: #fff;
  padding: 10px 18px;
  font-size: 0.9rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 4px 6px rgba(106, 156, 137, 0.4);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
  min-width: 160px;
}

.btn-save:hover {
  background: linear-gradient(135deg, #7aa98c, #5e8873, #486858);
  box-shadow: 0 6px 12px rgba(74, 109, 92, 0.5);
}


.btn-save:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.btn-save1 {
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #8bbcae, #6a9c89, #4f7a6b);
  color: #fff;
  padding: 10px 18px;
  font-size: 0.9rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 4px 6px rgba(106, 156, 137, 0.4);
  transition: background 0.3s ease, box-shadow 0.3s ease;
  user-select: none;
  min-width: 160px;
}

.btn-save1:hover {
  background: linear-gradient(135deg, #7aa98c, #5e8873, #486858);
  box-shadow: 0 6px 12px rgba(74, 109, 92, 0.5);
}


.btn-cancel {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
}

.contribution-form {
  background: #fff;
  padding: 100px;
  border-radius: 20;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  border: 2px solid #021526;
}

.contribution-form .form-group {
  margin-bottom: 15px;
}

.contribution-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.contribution-form input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.contribution-history {
  margin-top: 10px;
  border-top: 1px solid #dcdcdc;
  padding-top: 15px;
  background-color: #fafafa;
  border-radius: 6px;
  box-shadow: inset 0 1px 4px #93b9a9a8;
}

.contribution-history h4 {
  margin-bottom: 10px;
  margin-top: 2px;
  color: #2c3e50;
  text-align: center;
  font-weight: 600;
  font-size: 1.1rem;
}

.contribution-list {
  list-style: none;
  padding: 0 10px;
  margin: 0;
  max-height: 100px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}

.contribution-list li {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  align-items: center;
  padding: 10px 8px;
  border-bottom: 1px solid #eaeaea;
  font-size: 0.95rem;
  color: #2c3e50;
  transition: background-color 0.2s;
}

.contribution-list li:hover {
  background-color: #f3f9ff;
}

.contribution-date,
.contribution-amount {
  text-align: left;
}

.status-badge {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.status-badge.completed {
  background-color: #e6f7ee;
  color: #10b981;
}

.status-badge.pending {
  background-color: #fff3e6;
  color: #f59e0b;
}

.contribution-tab {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px #93b9a9;
}

.contribution-header {
  margin-bottom: 30px;
  text-align: center;
}

.contribution-header h2 {
  font-size: 1.5rem;
  font-weight: 700;
  box-shadow: none;
  background: none;
  color: #2c3e50;
  border: none;
  margin-bottom: 10px;
}

.contribution-header p {
  font-size: 1rem;
  color: #6c757d;
  margin: 0;
}

.contribution-summary {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); /* slightly smaller min */
  gap: 15px;
  margin-bottom: 30px;
}

  .summary-card {
  background: #ffffff;
  border-radius: 8px;
  padding: 10px 15px;
  text-align: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  border-bottom: 4px solid #c4c4c4;
}

.summary-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* hover lift effect */
}

.summary-label {
  font-size: 1.0rem;
  color: #6c757d;
  margin-bottom: 10px;
}

.summary-amount {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;

}

.text-danger {
  color: #e74c3c;
}

.text-success {
  color: #27ae60;
}
.contribution-form {
  max-width: 500px;
  margin: 0 auto 40px;
  padding: 20px;
  background: #f4faf7;
  border: 2px solid #2e4e38;
  border-radius: 8px;
}

.contribution-form h3 {
  margin-top: 0;
  color: #2c3e50;
  text-align: center;
}
.member-contributions-table {
  overflow-x: auto;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 5px #93b9a9a8;
  background-color: #ffffff;
  padding: 8px; 
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.member-contributions-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 6px; 
  font-size: 0.95rem;
}

.member-contributions-table th,
.member-contributions-table td {
  padding: 10px 14px; /* reduced padding */
  text-align: center;
  border-bottom: 1px solid #d7e2dc;
  vertical-align: middle;
  user-select: none;
}

.member-contributions-table th {
  background: linear-gradient(135deg, #8bbcae, #6a9c89, #4f7a6b);
  color: white;
  font-weight: 700;
  font-size: 1rem; /* slightly smaller */
  text-transform: uppercase;
  border-bottom: 2px solid #4f7a6b;
  box-shadow: 0 2px 6px rgba(74, 109, 92, 0.3);
  border-radius: 8px 8px 0 0;
}

.member-contributions-table tbody tr {
  background-color: #ecfdf5;
  box-shadow: 0 1px 3px rgba(106, 156, 137, 0.1);
  border-radius: 6px;
  transition: background-color 0.25s ease, box-shadow 0.25s ease;
}

.member-contributions-table tbody tr:nth-child(even) {
  background-color: #daf0de;
}

.member-contributions-table tbody tr:hover {
  background-color: #c7e6cb;
  box-shadow: 0 4px 10px rgba(74, 109, 92, 0.2);
  transform: translateY(-2px);
  transition: all 0.25s ease;
}


.status-badge {
  padding: 6px 14px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  display: inline-block;
}

.status-badge.completed {
  background-color: #d4f4dd;
  color: #219653;
}

.status-badge.pending {
  background-color: #ffe8cc;
  color: #e67e22;
}



.leave-group-section,
.admin-leave-notice {
  margin: 20px auto 0px auto;
  padding: 2px 20px;
  max-width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f4fdf9;
  background-image: linear-gradient(145deg, #ffffff, #ecf5f0);
  border: 1px solid #cdd8d2;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(106, 156, 137, 0.344);
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.leave-group-section:hover,
.admin-leave-notice:hover {
  box-shadow: 0 6px 16px rgba(106, 156, 137, 0.15);
  transform: translateY(-2px);
}



.leave-group-section h4,
.admin-leave-notice h4 {
  color: #343a40;
  margin-bottom: 12px;
  font-size: 1.05rem;
  display: flex;
  align-items: center;
}

.leave-group-button {
  background: linear-gradient(135deg, #dc3545, #b52a37);
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: auto;
  margin: 10px auto;
  box-shadow: 0 2px 6px rgba(220, 53, 69, 0.3);
}

.leave-group-button:hover {
  background: linear-gradient(135deg, #b52a37, #a51e2e);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(220, 53, 69, 0.4);
}

.leave-group-warning {
  margin-top: 8px;
  color: #6c757d;
  font-size: 0.85rem;
  line-height: 1.4;
  text-align: center;
  max-width: 320px;
}

.admin-leave-notice p {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.4;
  margin-bottom: 10;
  text-align: center;
  max-width: 350px;
}

.fa-sign-out-alt,
.fa-info-circle {
  margin-right: 8px;
  font-size: 1.1rem;
}

.fa-sign-out-alt {
  color: #dc3545;
}

.fa-info-circle {
  color: #17a2b8;
}

.promote-success-message {
  background: linear-gradient(135deg, #8bbcae, #6a9c89, #4f7a6b);
  color: white;
  padding: 12px 20px;
  border-radius: 4px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: fadeIn 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.promote-success-message i.fa-check-circle {
  margin-right: 10px;
  font-size: 1.2em;
  color: #e6f4ef; /* light soft contrast to blend well with the background */
}

.close-message {
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  padding: 0;
  margin-left: 15px;
  font-size: 1.2em;
  transition: color 0.2s ease;
}

.close-message:hover {
  color: #d0eae0; /* soft hover effect */
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}

.role-badge.admin {
  background-color: #ffeb3b;
  color: #000;
  font-weight: bold;
  padding: 4px 8px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.fa-crown {
  color: #ff9800;
}

.member-actions {
  display: flex;
  gap: 8px;
}

.promote-button {
  background: linear-gradient(135deg, #6a9c89, #4f7a6b); /* using your chosen green gradient */
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  margin-right: 5px;
  font-weight: 600;
  font-size: 0.8rem;
  box-shadow: 0 2px 5px rgba(106, 156, 137, 0.25);
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
}

.promote-button:hover {
  background: linear-gradient(135deg, #4f7a6b, #3f6659);
  transform: translateY(-1px);
  box-shadow: 0 4px 10px rgba(79, 122, 107, 0.4);
}

.group-header-decoration {
  height: 4px;
  background: linear-gradient(90deg, #2a4935 0%, #4a8c61 100%);
  margin-bottom: 25px;
  border-radius: 2px;
}

.floating-alert {
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%); 
  display: flex;
  flex-wrap: wrap;
  justify-content: center; 
  align-items: center; 
  background-color: #ffebee;
  border: 1px solid #ef9a9a;
  color: #c62828;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 350px;
  min-height: 50px;
  font-size: 20px;
}

.alert-content i {
  color: #cc0000;
  font-size: 28px;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
  font-weight: bold;
}

.alert-content i {
  color: #cc0000;
}

.close-alert-btn {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  
}

.close-alert-btn:hover {
  color: #cc0000;
}

.group-con {
  display: flex;
  flex-wrap: nowrap; /* prevent wrapping by default */
  gap: 12px;
  width: 100%;
  flex-direction: row;
}

.budget-total-container {
  min-width: 28%;
  box-sizing: border-box;
}

.budget-container {
  background-color: #f4faf7;
  padding: 20px;
  border-radius: 15px;
  border: 2px solid #2e4e38;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  color: white;
  min-height: 250px;
  max-height: 600px;
  margin-bottom: 10px;
}

.budget-header {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  gap: 10px;
}

.budget-header h3 {
  font-size: 1.5rem;
  color: #2a4935;
  margin: 0;
}
.btn-add, .btn-edit {
  background: linear-gradient(135deg, #739c90, #5d8978, #476e60);
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.btn-add:hover, .btn-edit:hover {
  background: #dcdcdc;
  color: #333;
  transform: translateY(-2px);
}

.budget-display {
  transition: margin-top 0.3s ease;
  margin-top: 0;
  flex-wrap: wrap;
  background: rgba(115, 115, 115, 0.096);
  padding: 20px;
  border-radius: 10px;
}

.budget {
  background-color: #ffffff;           
  border: 2px solid #6A9C89;           
  padding: 12px 16px;
  border-radius: 10px;
  color: #388e3c;                      
  display: flex;
  flex-direction: column;
  gap: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-weight: 650;
  font-size: 18px;
}

.budget-details {
  color: #1d4d2b;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.budget-name,
.budget-amount {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  font-size: 1rem;
}

.budget-name span,
.budget-amount span {
  color: #388e3c;   
}

.budget-name strong,
.budget-amount strong {
  color:  #388e3c;
  font-weight: bold;
}

.expenses-summary1 {
  background-color: #f5f5f5;
  border: 2px solid #697565;
  border-radius: 12px;
  padding: 12px 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.total-expenses,
.remaining-budget {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  font-size: 1.1rem;
  color: #444;
}

.total-expenses span,
.remaining-budget span {
  color: #444;
}

.total-expenses strong,
.remaining-budget strong {
  font-weight: bold;
  color: #444;
}

.remaining-budget strong.text-danger {
  color: #d32f2f;
}
.progress-bar {
  width: 100%;
  height: 12px !important;
  background-color: #e0e0e0;
  border-radius: 70px !important;
  overflow: hidden;
}

.progress-fill {
  height: 100%; 
  background: linear-gradient(135deg, #7aa98c, #5e8873, #486858);
  transition: width 0.3s;
}

.progress-fill.exceeded {
  background: #f44336 !important;
}

.progress-text {
  color: #2a4935;
  text-align: right;
  font-size: 1rem; /* Slightly bigger */
  margin-top: 6px;  /* Adds spacing below the bar */
}

.budget-form-modal {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

h2 {
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
  font-size: 1.3rem;
  font-weight: 600;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.222);
  letter-spacing: 0.5px;
  border: none;
  background: linear-gradient(135deg, #8fc4b4, #72aa95, #548271);
}

.budget-form {
  background-color: #eefbf5;
  border: 1px solid #2a4935;
  color: #333;
  padding: 25px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
}

.budget-form .form-group {
  margin-bottom: 15px;
  margin-top: 20px;
}

.budget-form label {
  display: block;
  margin-bottom: 5px;
}

.budget-form input {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.btn-cancel {
  background-color: #6c757d;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-cancel:hover {
  background-color: #4b5256;
}

.budget-success-message {
  background-color: #d4edda;
  color: #155724;
  padding: 10px;
  border-radius: 4px;
  margin: 10px 0;
  text-align: center;
  transition: opacity 0.5s ease;
  opacity: 1;
}

.budget-success-message.hide {
  opacity: 0;
  pointer-events: none;
}

.group-wrapper {
  min-width: 68%;
  width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 1200px;
}

.group-body {
  background: #ffffff;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  border: 2px solid #2e7d32;
  padding: 30px;
  margin-bottom: 20px;
}

.total-summary {
  text-align: center;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 10px;
}

.total-amount-card {
  background: #d0ebe3;
  border-radius: 10px;
  height: 70px;
  padding: 14px 16px;
  width: 100%;
  box-shadow: 0 4px 10px #93b9a9e1;
  box-sizing: border-box;
  text-align: center;
}

.total-label {
  font-size: 1.2rem;
  color: #5a6a7a;
  margin-bottom: 8px;
  margin-top: -7px;
  font-weight: 500;
}

.amount-display {
  display: flex;
  flex-direction: row;
  gap: 5px;
  justify-content: center; /* centers items horizontally */
  align-items: center;     /* centers items vertically (optional) */
  text-align: center; 
}

.currency {
  font-size: 1.4rem;
  font-weight: 600;
}

.currency.php {
  color: #2a4935;
}

.currency.usd {
  color: #4a6fa5;
  font-size: 1.2rem;
}

.retry-btn {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

.retry-btn:hover {
  background-color: #1565c0;
}

.expenses-section {
  overflow-x: auto;
  text-align: center;
  margin-bottom: 20px;
}

.expenses-container h3 {
    display: inline-block;
    font-size: 1.5rem;
    font-weight: 600;
    color: #2a4935;
    padding: 25px 0px 25px 0px;
    border-radius: 8px;
    animation: fadeSlideIn 0.6s ease-out;
    box-shadow: 0 2px 8px #00000059;
    text-transform: uppercase;
    text-align: center;
    letter-spacing: 1px;
    margin-bottom: 0px;
    width: 100%;
  }

.expenses-table table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 12px; 
  margin-bottom: 30px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #fff;
  border-radius: 10px;
  overflow: hidden; 
  box-shadow: 0 2px 10px rgba(76, 132, 96, 0.536); 
}

.expenses-table th,
.expenses-table td {
  padding: 6px 20px;
  text-align: center;
  font-size: 0.95rem;
  color: #444;
  border-bottom: 2px solid #d3d3d3;
  vertical-align: middle;
  user-select: none;
}

.expenses-table th {
  background-color: #6ea792;              /* your base green */
  color: white;
  position: sticky;
  top: 0;
  font-weight: 600;
  padding: 12px 20px;
  border-bottom: 3px solid #4f7a6b;      /* darker shade from earlier gradient */
  letter-spacing: 0.05em;
  text-transform: uppercase;
  box-shadow: 0 2px 4px rgba(74, 109, 92, 0.2);  /* subtle green tinted shadow */
}
Z
.expenses-table tbody tr {
  background-color: #ecfdf5;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  transition: all 0.25s ease;
  cursor: default;
}

.expenses-table tbody tr:hover {
  background-color: #f1fbf7;
  transform: translateY(-3px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.12);
}

.expenses-table tbody tr td:first-child {
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.expenses-table tbody tr td:last-child {
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.actions {
  vertical-align: middle; /* Keep table alignment intact */
}

.action-buttons {
  display: flex;
  gap: 8px;
  justify-content: center;
  align-items: center;
}

.edit-btn, .delete-btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}

.edit-btn {
  background: none;
  border: none;
  color: #6A9C89;        /* base color */
  cursor: pointer;
  font-size: 1rem;
  padding: 4px;
  transition: color 0.2s;
}

.edit-btn:hover {
  color: #8bbcae;        /* lighter shade for hover */
}


.delete-btn {
  background-color: #f44336;
  color: white;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.edit-btn:disabled, 
.delete-btn:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.total {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 4px;
  font-size: 16px;
  text-align: right;
}

.no-expenses {
  text-align: center;
  padding: 30px;
  color: #666;
}
.input-group {
  display: flex;
  gap: 8px;
}

.save-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.group-content {
  width: 100%;
  background: #ecfdf0;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 2px solid #2e4e38;
  padding: 25px;
  margin-bottom: 10px;
}

.group-header {
  margin-bottom: 10px;
}

.header-top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 15px;
}

.group-title-section {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-wrap: wrap;
}

.group-name {
  font-size: 1.8rem;
  margin: 0;
  color: #2c3e50;
  font-weight: 600;
}

.group-code-badge {
  display: flex;
  align-items: center;
  background: #e8f0ee;
  padding: 10px 16px; 
  border-radius: 20px; 
  font-size: 1.0rem; 
  gap: 10px; 
  background-color: #d1f0e6; 
  color: #2a4935; 
  font-weight: 500; 
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); 
  transition: all 0.3s ease;
}

.group-code-badge:hover {
  background-color: #b9e8d8; 
  transform: translateY(-2px); 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
}

.copy-button {
  background: none;
  border: none;
  color: #2a4935;
  cursor: pointer;
  padding: 0;
  font-size: 0.9rem;
  transition: transform 0.2s;
}

.copy-button:hover {
  transform: scale(1.1);
}

.group-action-buttons {
  display: flex;
  gap: 12px;
}

.my-groups-btn {
  background-color: #4d7768;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.my-groups-btn:hover {
  background-color: #1e3a27;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.manage-groups-btn {
  background: #4CAF50;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.manage-groups-btn:hover {
  background: #3e8e41;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}

.group-meta-info {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  color: #5a6a7a;
  font-size: 0.9rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-item i {
  color: #6c757d;
}

.meta-item span {
  font-size: 1.1rem; 
}

.group-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.group-modal {
  background: #ffffff;
  border-radius: 16px;
  width: 85%;
  max-width: 460px;
  max-height: 60vh;
  overflow-y: auto;
  overflow-x: hidden;
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.2);
  animation: modalFadeIn 0.3s ease-out;
  scrollbar-width: thin;
  scrollbar-color: #6a9c89 transparent;
}

/* Webkit scrollbar */
.group-modal::-webkit-scrollbar {
  width: 6px;
}
.group-modal::-webkit-scrollbar-thumb {
  background-color: #6a9c89;
  border-radius: 8px;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.group-modal-header {
  background: linear-gradient(135deg, #8bbcae, #6a9c89);
  color: white;
  padding: 20px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.group-modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
}

.close-modal {
  background: #93b9a95b;
  border: none;
  font-size: 1.4rem;
  color: white;
  cursor: pointer;
  padding: 6px;
  border-radius: 50%;
  transition: background-color 0.3s, transform 0.2s;
}
.close-modal:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.1);
}

.groups-list {
  padding: 14px;
  background-color: #f7fdf9;
}

.group-item {
  background: #ffffff;
  border-radius: 12px;
  padding: 12px 16px;
  margin-bottom: 10px;
  box-shadow: 0 2px 6px #93b9a9e1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.25s, box-shadow 0.25s;
  cursor: pointer;
}
.group-item:hover {
  background-color: #e4f4ef;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.group-info h4 {
  margin: 0;
  font-size: 1.05rem;
  color: #4f7a6b;
}

.group-meta {
  margin-top: 4px;
  font-size: 0.85rem;
  color: #6a9c89;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.group-meta i {
  margin-right: 6px;
  color: #6a9c89;
}

.group-actions {
  color: #4f7a6b;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  transition: transform 0.3s;
}
.group-item:hover .group-actions {
  transform: translateX(4px);
}


.group-modal-content {
  padding: 18px;
  background-color: #fafafa;
}
.group-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 100%;
  margin: 0 auto;
  padding: 120px 20px 20px;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
}

.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.spinner.small {
  width: 20px;
  height: 20px;
  border-width: 2px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-container {
  text-align: center;
  padding: 20px;
  background-color: #ffebee;
  border-radius: 5px;
  margin-top: 100px;
}

.error-message {
  color: #d32f2f;
  margin-bottom: 15px;
  margin-top: 4px;
}

.retry-button {
  background-color: #1976d2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.group-code {
  margin: 10px 0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.group-meta {
  display: flex;
  gap: 15px;
  color: #666;
  font-size: 0.9rem;
}

.group-tabs {
  display: flex;
  flex-wrap: wrap;
  border-bottom: 2px solid  #d5d4d4;
  margin-bottom: 30px;
  gap: 30px;
}

.group-tabs button {
  padding: 12px 24px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  position: relative;
  color: #666;
  font-weight: 500;
  transition: all 0.3s ease;
  border-radius: 6px 6px 0 0;
}

.group-tabs button:hover {
  background-color: #f5f5f5;
  color: #2a4935;
}

.group-tabs button.active {
  color: #2a4935;
  font-weight: 600;
  background-color: #f0f7f3;
}

.group-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: #2a4935;
  border-radius: 3px;
}

.expense-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.add-expense-button {
  background: linear-gradient(to right, #e5faed, #bde8d3);
  color: #2a4935;
  border: none;
  padding: 20px 20px;
  border-radius: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  font-size: 1rem;
  font-weight: 600;
  box-shadow: 0 2px 5px #a6a9a8c2;
  margin: 0 auto;
  width: 100%;
  position: relative;
}

.add-expense-button:hover {
  background-color: #1e3a27;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(42, 73, 53, 0.3);
}

.add-expense-button i {
  font-size: 1.1rem;
}

.add-expense-button .tooltip {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  display: none;
}

.add-expense-button:disabled:hover .tooltip {
  display: block;
}
.expenses-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.expense-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.expense-name {
  font-weight: bold;
}

.expense-user {
  font-size: 0.8rem;
  color: #666;
}

.expense-type {
  font-size: 0.8rem;
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 2px 6px;
  border-radius: 10px;
  display: inline-block;
}

.expense-amount {
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;
}

.expense-actions {
  display: flex;
  gap: 5px;
}

.action-button {
  background: none;
  border: none;
  cursor: pointer;
  color: #666;
}

.action-button.edit:hover {
  color: #1976d2;
}

.action-button.delete:hover {
  color: #d32f2f;
}

.members-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.member-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: linear-gradient(135deg, #f2fef7, #e5faee); 
  border-radius: 12px; 
  box-shadow: 0 2px 5px #93b9a9;
  transition: box-shadow 0.3s ease, transform 0.2s ease;
}

.member-item:hover {
  box-shadow: 0 8px 16px rgba(106, 156, 137, 0.3);
  transform: translateY(-3px);
}

.member-info {
  display: flex;
  flex-direction: column;
}

.member-name {
  font-weight: 600;
  font-size: 1rem;
  color: #4f7a6b; /* darker green for better contrast */
}

.member-email {
  font-size: 0.8rem;
  color: #7d8c96;
  font-style: italic;
  letter-spacing: 0.03em;
}

.member-role {
  display: flex;
  align-items: center;
  gap: 10px;
}

.role-badge {
  padding: 5px 12px; /* slightly bigger padding for better pill shape */
  border-radius: 14px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  box-shadow: 0 1px 3px rgba(74, 109, 92, 0.2);
  user-select: none;
}

.role-badge.admin {
  background-color: #c7e6cb;
  color: #1b5e20;
}

.role-badge.member {
  background-color: #a6c8ff;
  color: #0d47a1;
  margin-left: auto;
}

.remove-button {
  background-color: #ffd6d6;
  color: #d32f2f;
  border: none;
  padding: 5px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 1px 4px rgba(211, 47, 47, 0.2);
}

.remove-button:hover {
  background-color: #ff8a80;
  box-shadow: 0 3px 8px rgba(211, 47, 47, 0.4);
}


.invite-section {
  margin-top: 30px;
  padding: 25px 20px;
  background: linear-gradient(135deg, #f5fdfa, #dff5eb); /* slightly richer gradient */
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.348);
  border-left: 5px solid #5d8978;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.invite-section::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle at center, rgba(42, 73, 53, 0.05), transparent 60%);
  z-index: 0;
}

.invite-section:hover {
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
}

.invite-section h4 {
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #588668;
  position: relative;
  z-index: 1;
}

.invite-form {
  display: flex;
  gap: 12px;
  margin-top: 12px;
  position: relative;
  z-index: 1;
}

.email-input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #b0c4b1;
  border-radius: 8px;
  font-size: 0.95rem;
  outline: none;
  transition: border 0.3s ease, box-shadow 0.3s ease;
  background-color: #f8fdf9;
}

.email-input:focus {
  border-color: #2a4935;
  box-shadow: 0 0 0 3px rgba(42, 73, 53, 0.12);
}

.invite-button {
  background: linear-gradient(135deg, #5d8978, #476e60);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.2s ease;
}

.invite-button:hover {
  background: linear-gradient(135deg, #1f3627, #16271c);
  transform: scale(1.03);
}

.summary-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .summary-grid {
    grid-template-columns: 1fr;
  }
}

.summary-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(68, 68, 68, 0.351);
}

.summary-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.total-summary {
  font-size: 1.2rem;
  font-weight: bold;
  height: 100px;
}

.member-summary, .category-summary {
  margin-bottom: 15px;
}

.settings-section {
  background: linear-gradient(135deg, #f7fcfa, #effaf4);
  border: 1px solid #cfe2db;
  border-radius: 16px;
  padding: 30px 40px;
  max-width: 800px;
  margin: 40px auto;
  box-shadow: 0 2px 4px #93b9a9;
  transition: box-shadow 0.3s ease, border-color 0.3s ease;
}

.settings-section:hover {
  box-shadow: 0 12px 28px rgba(106, 156, 137, 0.12);
  border-color: #bad7cc;
}


.section-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1f3b2c;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.section-title i {
  font-size: 1.2rem;
  color: #3c6e58;
}

.setting-item {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.setting-label {
  font-weight: 600;
  color: #2a4935;
  font-size: 1.05rem;
  letter-spacing: 0.4px;
  margin-bottom: 6px;
  transition: color 0.3s ease;
}

.input-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
}

.setting-input {
  flex: 1;
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #c8d8d0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #fff;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}


.setting-input:focus {
  border-color: #3c9d81;
  outline: none;
  box-shadow: 0 0 0 3px rgba(60, 157, 129, 0.15);
}
.save-button {
  padding: 10px 16px;
  background-image: linear-gradient(135deg, #3c9d81, #2e7c68);
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-image 0.3s ease, transform 0.2s ease;
}

.save-button:hover:enabled {
  background-image: linear-gradient(135deg, #338b71, #246b5c);
  transform: translateY(-1px);
}

.save-button:disabled {
  background-image: none;
  background-color: #aaccc0;
  cursor: not-allowed;
  opacity: 0.7;
}

.error-message {
  margin-top: 5px;
  color: #d32f2f;
  font-size: 0.85rem;
}

.danger-zone {
  padding: 20px;
  background-color: #fff5f5;
  border-left: 4px solid #d32f2f;
  border-radius: 10px;
  margin-top: 40px;
  box-shadow: 0 2px 6px rgba(65, 64, 64, 0.693);
}

.danger-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #d32f2f;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.danger-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.danger-text {
  color: #444;
  font-size: 0.95rem;
  max-width: 70%;
}

.delete-button {
  background-color: #d32f2f;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 6px;
  font-weight: 500;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.delete-button:hover:enabled {
  background-color: #b71c1c;
}

.delete-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}


.modal-content1 {
  background-color: #f9fefc;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  margin: 100px auto;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-content2 {
  background-color: #f9fefc;
  border-radius: 16px;
  max-width: 500px;
  width: 100%;
  margin: 100px auto;
  padding: 0;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.modal-header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  border-bottom: 3px solid #4f7a6b;
  background: linear-gradient(135deg, #8bbcae, #6a9c89);
  box-shadow: inset 0 -4px 6px rgba(0,0,0,0.1);
  color: #fff;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.modal-header h3 {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin: 0;
  font-size: 1.6rem;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
}
.modal-header .close-button {
  position: absolute;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #e4f9e4;
  transition: color 0.3s ease;
  padding: 5px;
  border-radius: 50%;
}

.modal-header .close-button:hover {
  color: #f9fefc;
  background: rgba(255, 255, 255, 0.15);
}

.modal-body {
  padding: 20px;
  background-color: #eefbf5; 
}

.modal-overlay2 {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-header2 {
  position: relative;
  display: flex;
  padding: 15px 20px;
  justify-content: center;
  align-items: center;
  background-color: #f56161;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid #a40505;
  color: black;
}

.modal-header2 h3 {
  margin: 0;
  font-size: 1.2rem;
}

.close-button {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: black;
}

.modal-body2 {
  padding: 20px;
  background-color: #ffebee;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 10px;
  font-weight: bold;
  color: #4f7a6b;
}

.form-group input {
  width: 96%;
  padding: 8px;
  border: 1px solid #c0c0c0;
  border-radius: 4px;
}

.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

small {
    font-size: 11px;
    color: red;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

button.cancel-button{
  border: 1px solid #2e4e38;
}

.submit-button {
  background: linear-gradient(135deg, #82b1a3, #699b88, #476e60);
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background 0.3s ease, transform 0.2s ease;
}

.submit-button:hover {
  background: linear-gradient(135deg, #4d8167, #2f5740);
  transform: scale(1.03);
}

.cancel-button {
  background: linear-gradient(to bottom, #5e5e5e, #3f3f3f); /* dark gray gradient */
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cancel-button:hover {
  background: linear-gradient(to bottom, #4a4a4a, #2f2f2f); /* slightly darker on hover */
  transform: scale(1.02);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}





.confirmation-modal {
  text-align: center;
}

.confirmation-actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
}

.confirm-button {
  padding: 8px 15px;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  color: #fff;
  font-weight: 600;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  background: linear-gradient(135deg, #e57373, #d32f2f, #b71c1c);
  box-shadow: 0 2px 5px rgba(211, 47, 47, 0.4);
}

.confirm-button:hover{
  background: linear-gradient(135deg, #d32f2f, #b71c1c, #7f0000);
  box-shadow: 0 4px 10px rgba(123, 0, 0, 0.6);
}
.no-expenses {
  text-align: center;
  padding: 40px;
  color: #666;
}

.loading-expenses {
  display: flex;
  justify-content: center;
  padding: 20px;
}

.success-message {
  color: #2e7d32;
  margin-top: 10px;
}

@media (max-width: 1050px) {
  .expenses-section h3{
  padding: 25px 0px 25px 0px;
  width: 650px;
  }
}

@media (max-width: 760px) {
  .group-con {
    flex-wrap: wrap;
    flex-direction: column;
  }
  .budget-total-container{
    max-width: 100%;
  }
  .group-wrapper{
    width: 100%;
  }
  .member-item {
  display: flex;
  flex-wrap: wrap;
  }
  .contribution-form {
      max-width: 700px;
      margin-bottom: 0;
    }
}
</style>
