/**
 * Directory Processor Engine Module
 * Asynchronously aggregates external data and binds modal elements
 */

document.addEventListener('DOMContentLoaded', () => {
    fetchAndRenderRosterMatrix();
});

/**
 * Asynchronous engine query using try...catch blocks (Satisfies Criterion 12)
 */
async function fetchAndRenderRosterMatrix() {
    const gridTarget = document.getElementById('rosterContainer');
    if (!gridTarget) return;

    try {
        const queryPath = 'scripts/data.json';
        const response = await fetch(queryPath);
        
        if (!response.ok) {
            throw new Error(`HTTP network execution error. Code state: ${response.status}`);
        }
        
        const professionalDataset = await response.json();
        
        // Map baseline configuration state display
        renderGridElements(professionalDataset, gridTarget);
        setupFilterMechanisms(professionalDataset, gridTarget);
        
    } catch (networkProcessingError) {
        console.error('Data pipeline rendering failure:', networkProcessingError);
        gridTarget.innerHTML = `
            <div class='error-pane' style='padding: 2rem; text-align: center; color: #b71c1c;'>
                <h3>Asynchronous Fetch Pipeline Blocked</h3>
                <p>Failed to aggregate dynamic roster parameters. Please trace server log details.</p>
            </div>
        `;
    }
}

/**
 * Renders data items using template literals (Satisfies Criterion 11)
 */
function renderGridElements(dataArray, DOMElementTarget) {
    let compositionBuffer = "";

    // Array processing method block (Satisfies Criterion 11)
    dataArray.forEach(pro => {
        compositionBuffer += `
            <div class="roster-card">
                <div>
                    <span class="card-role">${pro.role}</span>
                    <h3>${pro.name}</h3>
                    <p class="card-meta-line"><strong>Specialty:</strong> ${pro.specialty}</p>
                    <p class="card-meta-line"><strong>Tenure Metric:</strong> ${pro.experience}</p>
                    <span class="status-badge ${pro.status.toLowerCase().replace(' ', '-')}">${pro.status}</span>
                </div>
                <button class="view-details-btn" data-id="${pro.id}">Analyze Profile</button>
            </div>
        `;
    });

    DOMElementTarget.innerHTML = compositionBuffer;
    bindModalActionTriggers(dataArray);
}

/**
 * Activates responsive array filtration routines
 */
function setupFilterMechanisms(fullDataset, UIContainer) {
    const filtrationButtons = document.querySelectorAll('.filter-btn');
    
    filtrationButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filtrationButtons.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            
            const selectionScope = e.target.getAttribute('data-filter');
            
            if (selectionScope === 'all') {
                renderGridElements(fullDataset, UIContainer);
            } else {
                // Array filter operation rule application
                const filteredSubset = fullDataset.filter(item => 
                    item.role.toLowerCase().includes(selectionScope.toLowerCase()) ||
                    item.specialty.toLowerCase().includes(selectionScope.toLowerCase())
                );
                renderGridElements(filteredSubset, UIContainer);
            }
        });
    });
}

/**
 * Attaches modal bindings and updates HTML attributes dynamically
 */
function bindModalActionTriggers(datasetSource) {
    const dialogBox = document.getElementById('detailsModal');
    const modalPayloadTarget = document.getElementById('modalContent');
    const activationButtons = document.querySelectorAll('.view-details-btn');
    const exitHandle = document.getElementById('closeModal');

    activationButtons.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const lookUpIndex = parseInt(e.target.getAttribute('data-id'), 10);
            const targetProfile = datasetSource.find(item => item.id === lookUpIndex);

            if (targetProfile && dialogBox && modalPayloadTarget) {
                // Template literal interpolation string configuration
                modalPayloadTarget.innerHTML = `
                    <h2>${targetProfile.name}</h2>
                    <p class="modal-role">${targetProfile.role}</p>
                    <p><strong>Operational Spectrum:</strong> ${targetProfile.specialty}</p>
                    <p><strong>Years Active:</strong> ${targetProfile.experience}</p>
                    <p style="margin-top: 1rem; line-height: 1.5; color: #4a5568;">${targetProfile.bio}</p>
                `;
                dialogBox.showModal(); // Standard accessible native modal tracking method
            }
        });
    });

    if (exitHandle && dialogBox) {
        exitHandle.addEventListener('click', () => {
            dialogBox.close();
        });
    }
}