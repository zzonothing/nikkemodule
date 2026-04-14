(function () {
    'use strict';

    // 키보드 단축키 차단 (F12, Ctrl+Shift+I/J/C, Ctrl+U)
    document.addEventListener('keydown', function (e) {
        if (e.keyCode === 123) { e.preventDefault(); return false; }
        if (e.ctrlKey && e.shiftKey && [73, 74, 67].includes(e.keyCode)) { e.preventDefault(); return false; }
        if (e.ctrlKey && e.keyCode === 85) { e.preventDefault(); return false; }
    });

    // 우클릭 비활성화
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    });

    // 개발자 도구 감지 (창 크기 차이 기반)
    var _blocked = false;
    var _THRESHOLD = 160;

    function _checkDevTools() {
        var widthDiff = window.outerWidth - window.innerWidth;
        var heightDiff = window.outerHeight - window.innerHeight;
        var isOpen = widthDiff > _THRESHOLD || heightDiff > _THRESHOLD;

        if (isOpen && !_blocked) {
            _blocked = true;
            _hideContent();
        } else if (!isOpen && _blocked) {
            _blocked = false;
            _showContent();
        }
    }

    function _hideContent() {
        var el = document.getElementById('__protect_overlay__');
        if (!el) {
            el = document.createElement('div');
            el.id = '__protect_overlay__';
            el.style.cssText = [
                'position:fixed', 'top:0', 'left:0', 'width:100%', 'height:100%',
                'background:#1a1a1a', 'color:#e0e0e0', 'display:flex',
                'align-items:center', 'justify-content:center',
                'font-size:1.2rem', 'font-family:sans-serif',
                'z-index:2147483647', 'text-align:center', 'padding:20px'
            ].join(';');
            el.innerHTML = '<div><p style="font-size:1.5rem;margin-bottom:12px;">&#128274;</p><p>개발자 도구가 감지되었습니다.</p><p style="font-size:0.9rem;color:#888;margin-top:8px;">Developer tools detected.</p></div>';
            document.body.appendChild(el);
        }
        el.style.display = 'flex';
    }

    function _showContent() {
        var el = document.getElementById('__protect_overlay__');
        if (el) el.style.display = 'none';
    }

    setInterval(_checkDevTools, 500);
})();
