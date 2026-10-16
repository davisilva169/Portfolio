"""Física VW — original Manim mark, in the APOEMA palette.

Static square image:
    python -m manim -s -r 1600,1600 branding/fisica_vw.py FisicaVWLogo
Animation:
    python -m manim -qh -r 1080,1080 branding/fisica_vw.py AbstractVibrations

Run with the Python environment that has Manim installed.
"""
from manim import (
    Scene, Circle, Text, VGroup, FadeOut, FadeIn, Write, Wiggle,
    DOWN, PI, WHITE, config,
)
import numpy as np

PALETTE = ["#B5651D", "#F2A900", "#FFE9C7"]
config.background_color = "#0A0A0A"
config.frame_width = 8
config.frame_height = 8


def ring(radius=3.2, width=12):
    # A single list gives the stroke a continuous three-stop gradient.
    return Circle(radius=radius).set_stroke(color=PALETTE, width=width).rotate(PI)


def wordmark():
    # Preserve the original Text objects, default font, and 108-point sizing.
    first = Text("Física", font_size=108)
    second = Text("VW", font_size=108)
    first.set_color("#FFF5E5")
    second.set_color_by_gradient(["#F2A900", "#B5651D"]).next_to(first, DOWN)
    # One gradient across VW, rather than restarting it inside each letter.
    for glyph in second.family_members_with_points():
        glyph.get_gradient_start_and_end_points = lambda: np.array([
            second.get_corner([-1, 1, 0]), second.get_corner([1, -1, 0])
        ])
    return VGroup(first, second).move_to([0, 0, 0])


class FisicaVWLogo(Scene):
    def construct(self):
        self.add(ring(), wordmark())


class AbstractVibrations(Scene):
    def construct(self):
        circles = [Circle(radius=0.1).set_fill(WHITE, opacity=1).set_stroke(WHITE, width=2)]
        circles += [ring(radius, width) for radius, width in
                    [(0.2, 4), (0.4, 6), (0.8, 8), (1.6, 10), (3.2, 12)]]
        self.add(circles[0])
        for previous, current in zip(circles, circles[1:]):
            self.play(FadeOut(previous), FadeIn(current), run_time=0.67)
            self.wait(0.2)
        text = wordmark()
        self.play(Write(text), run_time=1.5)
        self.play(Wiggle(VGroup(circles[-1], text)))
        self.wait(2)
