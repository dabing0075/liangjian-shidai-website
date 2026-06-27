/* ============================================================
   靓健时代（西安）健康科技有限公司 - 官网交互脚本
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // ---------- 导航栏滚动效果 ----------
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', function () {
        // 导航栏背景
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    // ---------- 移动端菜单 ----------
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    navToggle.addEventListener('click', function () {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // 点击导航链接关闭菜单
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // ---------- 回到顶部按钮 ----------
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ---------- 数字递增动画 ----------
    function animateNumbers() {
        const statNumbers = document.querySelectorAll('.stat-number[data-target]');

        statNumbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-target'));
            const duration = 2000; // 动画时长 2 秒
            const step = target / (duration / 16); // 每帧增量
            let current = 0;

            function updateNumber() {
                current += step;
                if (current >= target) {
                    number.textContent = target;
                } else {
                    number.textContent = Math.floor(current);
                    requestAnimationFrame(updateNumber);
                }
            }

            // 使用 Intersection Observer 触发
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateNumber();
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });

            observer.observe(number);
        });
    }

    animateNumbers();

    // ---------- 滚动动画（Intersection Observer） ----------
    function setupScrollAnimations() {
        const animatedElements = document.querySelectorAll(
            '.animate-fadeUp, .animate-slideLeft, .animate-slideRight, .animate-scaleIn'
        );

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    setupScrollAnimations();

    // ---------- 联系表单处理 ----------
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email) {
                alert('请填写您的姓名和邮箱。');
                return;
            }

            // 模拟表单提交
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '发送中...';
            submitBtn.disabled = true;

            setTimeout(() => {
                // 显示成功信息
                contactForm.innerHTML = `
                    <div class="form-success visible">
                        <div class="success-icon">✅</div>
                        <h4>留言已发送！</h4>
                        <p>感谢您的留言，${name}！<br>我们会在1-2个工作日内与您联系。</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // ---------- 平滑滚动（兼容处理） ----------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- 页面加载完成后的初始化 ----------
    // 触发首屏动画（hero 区域元素）
    setTimeout(() => {
        const heroAnimated = document.querySelectorAll('.hero .animate-fadeUp');
        heroAnimated.forEach(el => el.classList.add('visible'));
    }, 200);
});
