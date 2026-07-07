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

    // 터치/모바일 기기 여부 판별
    // 모바일에서는 가상 키보드·주소창(툴바) 표시로 innerWidth/innerHeight가 크게 변해
    // 창 크기 차이 기반 감지가 정상 사용자를 오탐(차단)하므로 감지 대상에서 제외한다.
    var _isTouchDevice = ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (window.matchMedia && window.matchMedia('(pointer: coarse)').matches);

    function _checkDevTools() {
        if (_isTouchDevice) return;

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

    // 데스크탑(마우스 포인터) 환경에서만 감지 루프 실행
    if (!_isTouchDevice) {
        setInterval(_checkDevTools, 500);
    }
})();
