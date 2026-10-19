 let isPlaying = false;
        let isRecording = false;
        let timerInterval = null;
        let secondsElapsed = 0;

        function switchView(viewName) {
            const dashboard = document.getElementById('view-dashboard');
            const studio = document.getElementById('view-studio');
            const navDash = document.getElementById('nav-dashboard');
            const navStudio = document.getElementById('nav-studio');

            if (viewName === 'dashboard') {
                dashboard.classList.remove('hidden');
                studio.classList.add('hidden');
                navDash.classList.add('active');
                navStudio.classList.remove('active');
            } else {
                dashboard.classList.add('hidden');
                studio.classList.remove('hidden');
                navStudio.classList.add('active');
                navDash.classList.remove('active');
            }
        }

        function togglePlay() {
            isPlaying = !isPlaying;
            const btnPlay = document.getElementById('btn-play');
            const status = document.getElementById('player-status');
            const tracks = document.querySelectorAll('.track-row');

            if (isPlaying) {
                btnPlay.innerHTML = '<i class="fa-solid fa-pause"></i>';
                status.innerText = 'A TOCAR...';
                status.style.color = '#10b981';
                tracks.forEach(t => t.classList.add('playing'));
                startTimer();
            } else {
                btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
                status.innerText = 'PAUSADO';
                status.style.color = '#f59e0b';
                tracks.forEach(t => t.classList.remove('playing'));
                stopTimer();
            }
        }

        function toggleRecord() {
            isRecording = !isRecording;
            const status = document.getElementById('player-status');

            if (isRecording) {
                if (!isPlaying) togglePlay();
                status.innerText = 'A GRAVAR...';
                status.style.color = '#ef4444';
            } else if (isPlaying) {
                status.innerText = 'A TOCAR...';
                status.style.color = '#10b981';
            }
        }

        function stopAudio() {
            isPlaying = false;
            isRecording = false;
            const btnPlay = document.getElementById('btn-play');
            const status = document.getElementById('player-status');
            const tracks = document.querySelectorAll('.track-row');

            btnPlay.innerHTML = '<i class="fa-solid fa-play"></i>';
            status.innerText = 'PARADO';
            status.style.color = '#94a3b8';
            tracks.forEach(t => t.classList.remove('playing'));

            stopTimer();
            secondsElapsed = 0;
            updateTimerDisplay();
        }

        function rewindAudio() {
            secondsElapsed = 0;
            updateTimerDisplay();
        }

        function startTimer() {
            if (timerInterval) clearInterval(timerInterval);
            timerInterval = setInterval(() => {
                secondsElapsed++;
                updateTimerDisplay();
            }, 1000);
        }

        function stopTimer() {
            if (timerInterval) clearInterval(timerInterval);
        }

        function updateTimerDisplay() {
            const hrs = String(Math.floor(secondsElapsed / 3600)).padStart(2, '0');
            const mins = String(Math.floor((secondsElapsed % 3600) / 60)).padStart(2, '0');
            const secs = String(secondsElapsed % 60).padStart(2, '0');
            document.getElementById('player-timer').innerText = `${hrs}:${mins}:${secs}`;
        }

        function toggleMute(btn) {
            btn.classList.toggle('active');
        }

        function toggleSolo(btn) {
            btn.classList.toggle('active');
        }

        function toggleMetronome() {
            document.getElementById('btn-metronome').classList.toggle('active');
        }

        function openExportModal() {
            document.getElementById('export-modal').classList.remove('hidden');
        }

        function closeExportModal() {
            document.getElementById('export-modal').classList.add('hidden');
            document.getElementById('export-progress').classList.add('hidden');
        }

        function handleExport() {
            const progress = document.getElementById('export-progress');
            const bar = document.getElementById('export-bar');
            const percentText = document.getElementById('export-percent');
            
            progress.classList.remove('hidden');

            let pct = 0;
            const interval = setInterval(() => {
                pct += 10;
                bar.style.width = pct + '%';
                percentText.innerText = pct + '%';

                if (pct >= 100) {
                    clearInterval(interval);
                    setTimeout(() => {
                        alert('🎉 Exportação concluída com sucesso!');
                        closeExportModal();
                    }, 300);
                }
            }, 120);
        }