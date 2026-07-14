---
title: "Burnout Predictor in Retrospect"
summary: "Why I rebuilt a stress-detection app, and why the honest fix turned out to be cultural, not technical."
date: "2026-06-29"
project: "Burnout Predictor"
projectHref: "https://github.com/sapphirethunderbird/burnout_predictor"
featured: false
---

## Where It Started

Office and school work usually mean sitting at a screen for long periods of time. Not only is this sedentary lifestyle a health risk, but it also tends to correlate with stress. Institutions are aware of this, and are taking steps to mitigate the stress aspect. In Japan, this tends to come in the form of a mandated annual stress check.

This sounds well-intended, and it should work. However the truth is far from this. I talked with a high school teacher who was subjected to the stress check annually. He told me that the test itself was in fact a stressor. It was just another task that they had to do on top of the already stressful job of being a teacher. The tool that was meant to prevent/mitigate work stress accidentally caused more of it.

It took me a while to realize this, but I too was taking the technology approach instead of actually addressing the root issue.

## What I Built

My idea was that if someone sat at a desk for a prolonged period of time, you would be able to see any changes in their facial expressions chronologically. If someone is looking stressed out, they should take a break from whatever they are doing to refresh.

Version one watched the user's face through the webcam in real time, classified the expression with a MobileNetV2 model trained on FER2013, and prompted the user to step away when it read sustained signs of stress. I was particular about two things:

1. The model ran locally on consumer hardware
2. The data was all local, giving the user control over it

Version one wasn't a horrible start, but there were some issues that I discovered later. The project was in fact broken in many different ways. For example:

- Training and serving fed the model two different distributions. It wasn't a data-volume problem. More data would not have fixed this.
- The model was actually undertrained. It was only 29% accurate with FER2013. After retraining from scratch, that number went up to 76%.
- The interface was actually lying. The screen that the user saw wasn't keeping up with the model's output.

## My Realization

After fixing these issues, I sat down and asked myself, "Is monitoring the user and telling them to take a break really solving the root cause of this issue?" When I started I was so sure that this would be the thing that ends burnout. But I realized that I was still putting the responsibility of the burnout onto the worker.

Over time I have developed a philosophy: it's never the user's fault, your product should fix it. Version one quietly assumed that the stress was the user's problem to fix. It was similar to what the annual stress checks actually do in practice. At the end of the day, the stress check and my burnout predictor both put the burden of stress back onto the user.

## What's The Real Issue?

When stripping the mechanism down, I found that a workplace or school sets the default level of stress you are expected to tolerate. You can carry it at first. But then more and more stress gets added over time, and that's not mentioning the stress that's already compounded. You have more responsibilities and expectations, and stepping back for relief might be seen as a personal failing. People absorb until they can't anymore, and when that happens it's seen as an individual problem as opposed to something larger.

A camera reading faces only stays at the individual level. It can also feel like surveillance rather than caring for someone's well-being. The real issue is with workplace/school culture.

## What About the Project?

This leads somewhere uncomfortable for a project that started as an AI demo. The honest fix is cultural, and no single application is going to change it. I don't want to pretend that the solution is to point a camera in someone's face all day every day.

This isn't to undermine the significance of this project in my journey. It taught me how to spot problems and apply solutions utilizing cutting edge technology. It taught me that it's worth debugging until midnight even when it looks hopeless. It showed me what it's like to think as both a designer and a developer, even if I was still learning as I went.

I'm not going to pretend that this project or the problems with it don't exist. In fact, the cycle of building, breaking, and arguing with myself taught me to ask a very important question: Is this the real problem, or just the one that's easy to point a tool at?
