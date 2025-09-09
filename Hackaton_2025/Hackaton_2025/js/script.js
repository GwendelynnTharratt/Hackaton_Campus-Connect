$(document).ready(function() {
    // ===== LOGIN / REGISTER TABS =====
    $('#loginForm').show();
    $('#registerForm').hide();

    $('#showLogin').click(function() {
        $('#loginForm').show();
        $('#registerForm').hide();
        $('#showLogin').addClass('active');
        $('#showRegister').removeClass('active');
    });

    $('#showRegister').click(function() {
        $('#loginForm').hide();
        $('#registerForm').show();
        $('#showRegister').addClass('active');
        $('#showLogin').removeClass('active');
    });

    // ===== LOGIN / REGISTER =====
    let users = JSON.parse(localStorage.getItem('users')) || [];

    $('#registerForm').submit(function(e) {
        e.preventDefault();
        const name = $('#regName').val();
        const email = $('#regEmail').val();
        const password = $('#regPassword').val();

        if(users.some(u => u.email === email)) {
            alert('Email already registered!');
            return;
        }

        const newUser = { id: Date.now(), name, email, password, groups: [], posts: [], materials: [] };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        alert('Registration successful!');
        window.location.href = "feedPage.html";
    });

    $('#loginForm').submit(function(e) {
        e.preventDefault();
        const email = $('#loginEmail').val();
        const password = $('#loginPassword').val();

        const user = users.find(u => u.email === email && u.password === password);
        if(user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            alert('Login successful!');
            window.location.href = "feedPage.html";
        } else {
            alert('Invalid email or password!');
        }
    });

    // ===== NAVBAR SCROLL =====
    $(window).scroll(function() {
        const navbar = $('.nav-bar');
        const scroll = $(this).scrollTop();
        const opacity = Math.min(scroll / 300, 1); 
        navbar.css('background', `rgba(131,180,200, ${opacity})`);
    });

    // ===== MODAL POPUP (Posts) =====
    $('#addPostBtn').click(function() {
        $('#postModal').removeClass('hidden').addClass('show');
    });

    $('#closeModal').click(function() {
        $('#postModal').removeClass('show').addClass('hidden');
    });

    $(window).click(function(e) {
        if ($(e.target).is('#postModal')) {
            $('#postModal').removeClass('show').addClass('hidden');
        }
    });

    // ===== ADD POSTS =====
    $('#postForm').submit(function(e) {
        e.preventDefault();

        const title = $('#postTitle').val();
        const content = $('#postContent').val();
        const author = $('#postAuthor').val();
        const date = new Date().toLocaleDateString();

        const newPost = `
        <div class="feed-post">
            <img src="https://picsum.photos/400/200?random=${Math.floor(Math.random()*1000)}" alt="Post Image">
            <div class="feed-post-content">
                <h3>${title}</h3>
                <p>${content}</p>
                <div class="feed-post-meta">
                    <span>By ${author}</span>
                    <span>${date}</span>
                </div>
                <button class="toggle-comments">💬 View Comments</button>
                <div class="feed-post-comments hidden">
                    <p>No comments yet. Be the first!</p>
                </div>
            </div>
        </div>`;

        $('.latest-posts-feed').prepend(newPost);

        $('#postForm')[0].reset();
        $('#postModal').removeClass('show').addClass('hidden');
    });

    // ===== TOGGLE COMMENTS =====
    $(document).on('click', '.toggle-comments', function() {
        $(this).siblings('.feed-post-comments').slideToggle();
    });

    // ===== JOIN GROUP BUTTON =====
    $(document).on('click', '.group-card button', function() {
        if (!$(this).hasClass('joined')) {
            $(this).addClass('joined').text('Joined');
        }
    });

    // ===== ADD MATERIAL =====
    $('#materialForm').submit(function(e) {
        e.preventDefault();

        const title = $('#materialTitle').val();
        const file = $('#materialFile')[0].files[0];
        const fileName = file ? file.name : 'Unknown file';

        const newMaterial = `
            <li>
                <strong>${title}</strong>
                <a href="#" download="${fileName}">Download</a>
            </li>
        `;
        $('#materialsContainer ul').prepend(newMaterial);
        $(this)[0].reset();
    });

    // ===== CONTACT FORM =====
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        $('#formSuccess').fadeIn().delay(3000).fadeOut();
        $(this)[0].reset();
    });
});

