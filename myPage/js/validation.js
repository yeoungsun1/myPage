// js/validation.js

// 실시간 검사를 위한 요소 가져오기
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');
const pwError = document.getElementById('pw-error');
const pwConfirmError = document.getElementById('pw-confirm-error');

// 비밀번호 복잡성 검사 함수 (재사용을 위해 별도 함수로 분리)
function validatePasswordComplexity(password) {
    // 최소 8자, 영문, 숫자, 특수문자 포함
    const pwRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
    if (password.length > 0 && !pwRegex.test(password)) {
        pwError.textContent = '비밀번호는 8자 이상, 영문, 숫자, 특수문자를 포함해야 합니다.';
        return false;
    } else {
        pwError.textContent = ''; // 오류가 없으면 메시지 제거
        return true;
    }
}

// 비밀번호 일치 검사 함수 (재사용을 위해 별도 함수로 분리)
function validatePasswordMatch(password, passwordConfirm) {
    // 비밀번호 재확인에 입력이 있고, 비밀번호와 일치하지 않을 경우
    if (passwordConfirm.length > 0 && password !== passwordConfirm) {
        pwConfirmError.textContent = '비밀번호가 일치하지 않습니다.';
        return false;
    } else {
        pwConfirmError.textContent = ''; // 일치하거나 입력이 없으면 메시지 제거
        return true;
    }
}

// --- 실시간 유효성 검사 (Real-Time Validation) ---

// 1. 비밀번호 입력 시
passwordInput.addEventListener('input', function() {
    validatePasswordComplexity(this.value);
    // 비밀번호가 변경되면 일치 여부도 다시 검사해야 함
    validatePasswordMatch(this.value, passwordConfirmInput.value); 
});

// 2. 비밀번호 재확인 입력 시
passwordConfirmInput.addEventListener('input', function() {
    validatePasswordMatch(passwordInput.value, this.value);
});


// --- 최종 폼 제출 시 유효성 검사 (Form Submission Validation) ---

document.getElementById('signup-form').addEventListener('submit', function(e) {
    e.preventDefault(); 

    // 1. 입력 필드 값 가져오기
    const userId = document.getElementById('user-id').value.trim();
    const name = document.getElementById('name').value.trim();
    const age = document.getElementById('age').value.trim();
    const email = document.getElementById('email').value.trim();

    // 2. 에러 메시지 초기화 (실시간 검사가 이미 하지만, 만약을 위해 전체 초기화)
    document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
    let isValid = true;

    // 3. 비밀번호 검사 (실시간 검사 함수를 재사용하여 최종 유효성 판단)
    if (!validatePasswordComplexity(passwordInput.value)) {
        isValid = false;
    }
    if (!validatePasswordMatch(passwordInput.value, passwordConfirmInput.value)) {
        isValid = false;
    }
    
    // 아이디 검사
    const idRegex = /^[a-zA-Z0-9]{5,12}$/;
    if (!idRegex.test(userId)) {
        document.getElementById('id-error').textContent = '아이디는 영문/숫자 5~12자입니다.';
        isValid = false;
    }

    // 이름 검사
    const nameRegex = /^[가-힣a-zA-Z]{2,}$/;
    if (!nameRegex.test(name)) {
        document.getElementById('name-error').textContent = '이름을 2자 이상 정확히 입력해 주세요.';
        isValid = false;
    }

    // 나이 검사
    const ageValue = parseInt(age, 10);
    if (isNaN(ageValue) || ageValue < 14 || ageValue > 100) {
        document.getElementById('age-error').textContent = '나이는 14세 이상 100세 이하의 숫자여야 합니다.';
        isValid = false;
    }

    // 이메일 검사
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailRegex.test(email)) {
        document.getElementById('email-error').textContent = '올바른 이메일 주소 형식으로 입력해 주세요.';
        isValid = false;
    }

    // 4. 최종 결과 처리
    if (isValid) {
        alert('🎉 회원가입이 성공적으로 완료되었습니다!');
        // 서버 전송 로직
        // this.submit();
    }
});