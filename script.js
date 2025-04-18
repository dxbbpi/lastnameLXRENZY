const defaultProfilePic = "https://img2.pic.in.th/pic/juti.png";
const ITEMS_PER_PAGE = 10;
let currentPage = 1;

// แปลงสมาชิกให้เป็น HTML element
function createMemberElement(member) {
    const profilePicUrl = `https://graph.facebook.com/${member.fbId}/picture?type=large`;
    return `
        <div class="member" data-name="${member.name}">
            <img class="profile-pic" src="${profilePicUrl}" alt="${member.name}"
                 onerror="this.onerror=null; this.src='${defaultProfilePic}';">
            <div class="content">
                <p class="name" onclick="window.open('https://facebook.com/${member.fbId}', '_blank');">${member.name}</p>
            </div>
            <a href="https://facebook.com/${member.fbId}" target="_blank">
                <div class="fb-icon"><i class="fab fa-facebook-f"></i></div>
            </a>
        </div>
    `;
}

// แสดงสมาชิกทั้งหมด (ตามหน้า)
function renderMembers() {
    const container = document.getElementById("member-container");
    container.innerHTML = ''; // รีเซ็ตเนื้อหาก่อน
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageMembers = filteredMembers.slice(start, end);

    pageMembers.forEach((member, index) => {
        container.innerHTML += createMemberElement(member);
        const memberElement = container.children[index];
        memberElement.style.animationDelay = `${index * 0.05}s`;
    });

    updatePagination();
}

// อัปเดตปุ่ม pagination (หน้า และการไปหน้าถัดไป)
function updatePagination() {
    const totalPages = Math.ceil(filteredMembers.length / ITEMS_PER_PAGE);
    const pagination = document.getElementById("pagination");
    pagination.innerHTML = `
        <button id="prev-page" ${currentPage === 1 ? 'disabled' : ''}>ก่อนหน้า</button>
        <span>หน้า ${currentPage} จาก ${totalPages}</span>
        <button id="next-page" ${currentPage === totalPages ? 'disabled' : ''}>ถัดไป</button>
    `;

    document.getElementById("prev-page").addEventListener("click", () => {
        if (currentPage > 1) {
            currentPage--;
            renderMembers();
        }
    });

    document.getElementById("next-page").addEventListener("click", () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderMembers();
        }
    });
}

// ฟังก์ชันค้นหาสมาชิก
const searchInput = document.getElementById("search-input");
let filteredMembers = [...members];

searchInput.addEventListener("input", function() {
    const searchTerm = this.value.trim().toLowerCase();
    filteredMembers = members.filter(member =>
        member.name.toLowerCase().includes(searchTerm)
    );
    currentPage = 1; // รีเซ็ตหน้าเมื่อเริ่มการค้นหา
    renderMembers();
});

// ปุ่มปรับธีม (โหมดมืด/สว่าง)
const themeToggleBtn = document.getElementById("theme-toggle");
let isDarkMode = true;
themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>'; // default คือ dark mode

themeToggleBtn.addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);
    document.body.classList.toggle("light-mode", !isDarkMode);
    themeToggleBtn.innerHTML = isDarkMode
        ? '<i class="fas fa-sun"></i>'
        : '<i class="fas fa-moon"></i>';
});

// แสดงผลเริ่มต้น
renderMembers();
