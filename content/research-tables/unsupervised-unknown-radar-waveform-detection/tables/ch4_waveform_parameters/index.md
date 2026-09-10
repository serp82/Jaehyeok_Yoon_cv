---
title: "Unknown-detection waveform parameter ranges"
layout: project
---

# Unknown-detection waveform parameter ranges

`U(a,b)` denotes a uniform draw over the indicated interval; brackets indicate a discrete or integer range where specified in the source.

| Radar family | Waveform | Parameter | Range |
| --- | --- | --- | --- |
| FM | LFM | fc | `U(fs/6, fs/5)` |
| FM | LFM | B | `U(fs/20, fs/10)` |
| FM | LFM | N | 512–1920 |
| FM | NLFM | fc | `U(fs/6, fs/5)` |
| FM | NLFM | B | `U(fs/20, fs/10)` |
| FM | NLFM | N | 512–1920 |
| FM | NLFM | Wtype | Sinusoids, Taylor |
| FSK | Costas | Nhop | 3, 4, 5, 6 |
| FSK | Costas | fmin | `U(fs/30, fs/24)` |
| FSK | Costas | N | `U[512,1920]` |
| BPSK | Barker | fc | `U(fs/6, fs/5)` |
| BPSK | Barker | Lc | 2, 3, 4, 5, 7, 11, 13 |
| BPSK | Barker | Ncc | `U[20,24]` |
| Polyphase | Frank, P1, P2 | fc | `U(fs/6, fs/5)` |
| Polyphase | Frank, P1, P2 | Ncc | 3, 4, 5 |
| Polyphase | Frank, P1, P2 | M | 6, 7, 8 |
| Polyphase | P3, P4 | fc | `U(fs/6, fs/5)` |
| Polyphase | P3, P4 | Ncc | 3, 4, 5 |
| Polyphase | P3, P4 | Ns | 4, 16, 36, 49, 64 |
| Polytime | T1, T2 | fc | `U(fs/6, fs/5)` |
| Polytime | T1, T2 | Ng | 4, 5, 6 |
| Polytime | T1, T2 | N | 512–1920 |
| Polytime | T3, T4 | fc | `U(fs/6, fs/5)` |
| Polytime | T3, T4 | B | `U(fs/20, fs/10)` |
| Polytime | T3, T4 | Ng | 4, 5, 6 |
| Polytime | T3, T4 | N | `U[512,1920]` |

Source: `thesis/chapters/04_unknown_waveform_detection/tables/waveform_generation_parameters.tex`.
