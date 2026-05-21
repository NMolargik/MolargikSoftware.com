#!/usr/bin/env python3
"""Generate Flutter Counter App Interview Guide PDF."""

from reportlab.lib.pagesizes import LETTER
from reportlab.lib import colors
from reportlab.lib.units import inch
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
    HRFlowable, KeepTogether
)
from reportlab.platypus.flowables import Flowable
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

OUTPUT_PATH = "/Users/nickmolargik/Developer/Molargik Software LLC/Websites/MolargikSoftware/flutter_counter_guide.pdf"

# Colors
DEEP_PURPLE = HexColor("#6200EE")
HEADER_BG = HexColor("#1A1A2E")
CODE_BG = HexColor("#F5F5F5")
SECTION_HEADING_COLOR = HexColor("#4A148C")
ALT_ROW_COLOR = HexColor("#EDE7F6")
WHITE = colors.white
BLACK = colors.black
MEDIUM_GRAY = HexColor("#555555")
LIGHT_BORDER = HexColor("#CCCCCC")
ACCENT_PURPLE = HexColor("#7C4DFF")


class HeaderBanner(Flowable):
    """Dark header banner with title and subtitle."""
    def __init__(self, width, title, subtitle):
        super().__init__()
        self.width = width
        self.title = title
        self.subtitle = subtitle
        self.height = 100

    def draw(self):
        # Background
        self.canv.setFillColor(HEADER_BG)
        self.canv.rect(0, 0, self.width, self.height, fill=1, stroke=0)

        # Purple accent bar on left
        self.canv.setFillColor(DEEP_PURPLE)
        self.canv.rect(0, 0, 6, self.height, fill=1, stroke=0)

        # Title
        self.canv.setFillColor(WHITE)
        self.canv.setFont("Helvetica-Bold", 22)
        self.canv.drawString(20, 62, self.title)

        # Subtitle
        self.canv.setFillColor(HexColor("#B39DDB"))
        self.canv.setFont("Helvetica", 12)
        self.canv.drawString(20, 38, self.subtitle)

        # Bottom accent line
        self.canv.setStrokeColor(DEEP_PURPLE)
        self.canv.setLineWidth(2)
        self.canv.line(0, 0, self.width, 0)


def make_code_block_paragraphs(code_text, width, font_size=9):
    """
    Return a Table where each line of code is its own row.
    This allows ReportLab to split the block across page boundaries naturally.
    A purple left border and gray background are applied via TableStyle.
    """
    from reportlab.platypus import Table, TableStyle
    line_height = font_size * 1.4
    h_padding = 10   # left/right text padding inside cell
    border_width = 4

    row_style = ParagraphStyle(
        "CodeRow",
        fontName="Courier",
        fontSize=font_size,
        leading=line_height,
        textColor=HexColor("#212121"),
        spaceBefore=0,
        spaceAfter=0,
    )

    lines = code_text.split('\n')
    rows = []
    for ln in lines:
        safe = ln.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')
        if not safe.strip():
            safe = ' '
        rows.append([Paragraph(safe, row_style)])

    tbl = Table(rows, colWidths=[width], repeatRows=0, splitByRow=1)

    n = len(rows)
    style_cmds = [
        # Overall background
        ("BACKGROUND", (0, 0), (-1, -1), CODE_BG),
        # Left purple accent via left line on every row
        ("LINEBEFORE", (0, 0), (0, -1), border_width, DEEP_PURPLE),
        # Outer box
        ("BOX", (0, 0), (-1, -1), 0.5, HexColor("#DDDDDD")),
        # Padding: extra top on first row, extra bottom on last
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
        ("TOPPADDING", (0, 0), (0, 0), 8),
        ("BOTTOMPADDING", (0, n - 1), (0, n - 1), 8),
        ("LEFTPADDING", (0, 0), (-1, -1), h_padding + border_width),
        ("RIGHTPADDING", (0, 0), (-1, -1), h_padding),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
    ]
    tbl.setStyle(TableStyle(style_cmds))
    return tbl


class CodeBlock(Flowable):
    """Rendered code block with gray background and purple left border."""
    def __init__(self, code_text, width, font_size=9):
        super().__init__()
        self.code_text = code_text
        self.width = width
        self.font_size = font_size
        self.padding = 10
        self.border_width = 4
        self.line_height = font_size * 1.4

        lines = code_text.split('\n')
        self.lines = lines
        self.height = len(lines) * self.line_height + self.padding * 2

    def draw(self):
        # Background
        self.canv.setFillColor(CODE_BG)
        self.canv.rect(0, 0, self.width, self.height, fill=1, stroke=0)

        # Left accent border
        self.canv.setFillColor(DEEP_PURPLE)
        self.canv.rect(0, 0, self.border_width, self.height, fill=1, stroke=0)

        # Subtle outer border
        self.canv.setStrokeColor(HexColor("#DDDDDD"))
        self.canv.setLineWidth(0.5)
        self.canv.rect(0, 0, self.width, self.height, fill=0, stroke=1)

        # Code text
        self.canv.setFillColor(HexColor("#212121"))
        self.canv.setFont("Courier", self.font_size)

        y = self.height - self.padding - self.font_size
        for line in self.lines:
            self.canv.drawString(self.border_width + self.padding, y, line)
            y -= self.line_height


def add_page_number(canvas, doc):
    """Footer with page number."""
    canvas.saveState()
    page_num = canvas.getPageNumber()
    width, height = LETTER

    canvas.setStrokeColor(HexColor("#CCCCCC"))
    canvas.setLineWidth(0.5)
    canvas.line(doc.leftMargin, doc.bottomMargin - 10, width - doc.rightMargin, doc.bottomMargin - 10)

    canvas.setFont("Helvetica", 8)
    canvas.setFillColor(MEDIUM_GRAY)
    canvas.drawString(doc.leftMargin, doc.bottomMargin - 22,
                      "Flutter Counter App — Interview Guide")
    canvas.drawRightString(width - doc.rightMargin, doc.bottomMargin - 22,
                           f"Page {page_num}")
    canvas.restoreState()


def build_styles():
    styles = getSampleStyleSheet()

    body = ParagraphStyle(
        "Body",
        fontName="Helvetica",
        fontSize=10,
        leading=15,
        textColor=HexColor("#212121"),
        spaceAfter=6,
    )

    section_heading = ParagraphStyle(
        "SectionHeading",
        fontName="Helvetica-Bold",
        fontSize=14,
        leading=18,
        textColor=SECTION_HEADING_COLOR,
        spaceBefore=18,
        spaceAfter=6,
        borderPadding=(0, 0, 4, 0),
    )

    features_heading = ParagraphStyle(
        "FeaturesHeading",
        fontName="Helvetica-Bold",
        fontSize=13,
        leading=17,
        textColor=SECTION_HEADING_COLOR,
        spaceBefore=12,
        spaceAfter=6,
    )

    bullet = ParagraphStyle(
        "Bullet",
        fontName="Helvetica",
        fontSize=10,
        leading=15,
        textColor=HexColor("#212121"),
        leftIndent=18,
        spaceAfter=4,
        bulletIndent=6,
    )

    bold_bullet = ParagraphStyle(
        "BoldBullet",
        fontName="Helvetica",
        fontSize=10,
        leading=15,
        textColor=HexColor("#212121"),
        leftIndent=18,
        spaceAfter=5,
        bulletIndent=6,
    )

    inline_code_style = ParagraphStyle(
        "InlineCode",
        fontName="Courier",
        fontSize=9,
        leading=14,
        textColor=HexColor("#212121"),
        backColor=CODE_BG,
        spaceAfter=4,
    )

    caption = ParagraphStyle(
        "Caption",
        fontName="Helvetica-Oblique",
        fontSize=9,
        leading=13,
        textColor=MEDIUM_GRAY,
        spaceAfter=4,
    )

    return {
        "body": body,
        "section_heading": section_heading,
        "features_heading": features_heading,
        "bullet": bullet,
        "bold_bullet": bold_bullet,
        "inline_code": inline_code_style,
        "caption": caption,
    }


def section_heading_flowable(text, styles):
    """Returns a section heading with a decorative underline."""
    elements = []
    elements.append(Spacer(1, 10))
    elements.append(Paragraph(text, styles["section_heading"]))
    elements.append(HRFlowable(width="100%", thickness=1.5, color=DEEP_PURPLE, spaceAfter=6))
    return elements


def bullet_item(text, styles):
    return Paragraph(f"<bullet>\u2022</bullet> {text}", styles["bullet"])


def bold_bullet_item(bold_part, rest, styles):
    return Paragraph(
        f'<bullet>\u2022</bullet> <b>{bold_part}</b> {rest}',
        styles["bold_bullet"]
    )


def generate_pdf():
    left_margin = 0.85 * inch
    right_margin = 0.85 * inch
    top_margin = 0.75 * inch
    bottom_margin = 0.85 * inch

    doc = SimpleDocTemplate(
        OUTPUT_PATH,
        pagesize=LETTER,
        leftMargin=left_margin,
        rightMargin=right_margin,
        topMargin=top_margin,
        bottomMargin=bottom_margin,
        title="Flutter Counter App — Interview Guide",
        author="Molargik Software",
    )

    usable_width = LETTER[0] - left_margin - right_margin
    styles = build_styles()
    story = []

    # ─── HEADER BANNER ───────────────────────────────────────────────────────
    story.append(HeaderBanner(
        usable_width,
        "Flutter Counter App \u2014 Interview Guide",
        "Built-in State Management + SharedPreferences"
    ))
    story.append(Spacer(1, 18))

    # ─── FEATURES ────────────────────────────────────────────────────────────
    story.append(Paragraph("Features", styles["features_heading"]))
    story.append(HRFlowable(width="100%", thickness=1, color=HexColor("#CE93D8"), spaceAfter=6))
    features = [
        "Counter incremented by a large button",
        "Each tap logs a timestamp to SharedPreferences",
        "History page accessible via AppBar icon",
        "Clear button resets counter and clears history",
    ]
    for f in features:
        story.append(bullet_item(f, styles))
    story.append(Spacer(1, 6))

    # ─── SECTION 1: PROJECT SETUP ─────────────────────────────────────────────
    story.extend(section_heading_flowable("1. Project Setup", styles))
    story.append(Paragraph("Run the following in your terminal:", styles["body"]))
    story.append(Spacer(1, 4))
    story.append(CodeBlock(
        "flutter create counter_app\ncd counter_app",
        usable_width
    ))
    story.append(Spacer(1, 10))
    story.append(Paragraph("Add <font name='Courier' size='9'>shared_preferences</font> to <font name='Courier' size='9'>pubspec.yaml</font>:", styles["body"]))
    story.append(Spacer(1, 4))
    story.append(CodeBlock(
        "dependencies:\n  flutter:\n    sdk: flutter\n  shared_preferences: ^2.3.0",
        usable_width
    ))
    story.append(Spacer(1, 10))
    story.append(CodeBlock("flutter pub get", usable_width))
    story.append(Spacer(1, 6))

    # ─── SECTION 2: FILE STRUCTURE ────────────────────────────────────────────
    story.extend(section_heading_flowable("2. File Structure", styles))
    story.append(CodeBlock(
        "lib/\n  main.dart\n  pages/\n    home_page.dart\n    history_page.dart\n  services/\n    history_service.dart",
        usable_width
    ))
    story.append(Spacer(1, 6))

    # ─── SECTION 3: HISTORY SERVICE ───────────────────────────────────────────
    story.extend(section_heading_flowable("3. lib/services/history_service.dart", styles))
    story.append(Paragraph("Encapsulates all SharedPreferences logic in one place.", styles["body"]))
    story.append(Spacer(1, 4))
    history_service_code = (
        "import 'package:shared_preferences/shared_preferences.dart';\n"
        "\n"
        "class HistoryService {\n"
        "  static const _key = 'history';\n"
        "\n"
        "  Future<List<String>> getHistory() async {\n"
        "    final prefs = await SharedPreferences.getInstance();\n"
        "    return prefs.getStringList(_key) ?? [];\n"
        "  }\n"
        "\n"
        "  Future<void> addEntry() async {\n"
        "    final prefs = await SharedPreferences.getInstance();\n"
        "    final history = prefs.getStringList(_key) ?? [];\n"
        "    history.add(DateTime.now().toIso8601String());\n"
        "    await prefs.setStringList(_key, history);\n"
        "  }\n"
        "\n"
        "  Future<void> clearHistory() async {\n"
        "    final prefs = await SharedPreferences.getInstance();\n"
        "    await prefs.remove(_key);\n"
        "  }\n"
        "}"
    )
    story.append(make_code_block_paragraphs(history_service_code, usable_width))
    story.append(Spacer(1, 6))

    # ─── SECTION 4: HOME PAGE ─────────────────────────────────────────────────
    story.extend(section_heading_flowable("4. lib/pages/home_page.dart", styles))
    story.append(Paragraph(
        "Uses <font name='Courier' size='9'>StatefulWidget</font> \u2014 the built-in state management approach.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    home_page_code = (
        "import 'package:flutter/material.dart';\n"
        "import '../services/history_service.dart';\n"
        "import 'history_page.dart';\n"
        "\n"
        "class HomePage extends StatefulWidget {\n"
        "  const HomePage({super.key});\n"
        "\n"
        "  @override\n"
        "  State<HomePage> createState() => _HomePageState();\n"
        "}\n"
        "\n"
        "class _HomePageState extends State<HomePage> {\n"
        "  final _historyService = HistoryService();\n"
        "  int _count = 0;\n"
        "\n"
        "  Future<void> _increment() async {\n"
        "    await _historyService.addEntry();\n"
        "    setState(() => _count++);\n"
        "  }\n"
        "\n"
        "  Future<void> _clear() async {\n"
        "    await _historyService.clearHistory();\n"
        "    setState(() => _count = 0);\n"
        "  }\n"
        "\n"
        "  @override\n"
        "  Widget build(BuildContext context) {\n"
        "    return Scaffold(\n"
        "      appBar: AppBar(\n"
        "        title: const Text('Counter'),\n"
        "        actions: [\n"
        "          IconButton(\n"
        "            icon: const Icon(Icons.delete_outline),\n"
        "            tooltip: 'Clear',\n"
        "            onPressed: _clear,\n"
        "          ),\n"
        "          IconButton(\n"
        "            icon: const Icon(Icons.history),\n"
        "            tooltip: 'History',\n"
        "            onPressed: () => Navigator.push(\n"
        "              context,\n"
        "              MaterialPageRoute(builder: (_) => const HistoryPage()),\n"
        "            ),\n"
        "          ),\n"
        "        ],\n"
        "      ),\n"
        "      body: Center(\n"
        "        child: Column(\n"
        "          mainAxisAlignment: MainAxisAlignment.center,\n"
        "          children: [\n"
        "            Text(\n"
        "              '$_count',\n"
        "              style: const TextStyle(fontSize: 80, fontWeight: FontWeight.bold),\n"
        "            ),\n"
        "            const SizedBox(height: 40),\n"
        "            ElevatedButton(\n"
        "              onPressed: _increment,\n"
        "              style: ElevatedButton.styleFrom(\n"
        "                padding: const EdgeInsets.symmetric(horizontal: 60, vertical: 30),\n"
        "                textStyle: const TextStyle(fontSize: 24),\n"
        "              ),\n"
        "              child: const Text('Tap me'),\n"
        "            ),\n"
        "          ],\n"
        "        ),\n"
        "      ),\n"
        "    );\n"
        "  }\n"
        "}"
    )
    story.append(make_code_block_paragraphs(home_page_code, usable_width))
    story.append(Spacer(1, 6))

    # ─── SECTION 5: HISTORY PAGE ──────────────────────────────────────────────
    story.extend(section_heading_flowable("5. lib/pages/history_page.dart", styles))
    story.append(Paragraph(
        "Loads history from SharedPreferences when the page opens.",
        styles["body"]
    ))
    story.append(Spacer(1, 4))
    history_page_code = (
        "import 'package:flutter/material.dart';\n"
        "import '../services/history_service.dart';\n"
        "\n"
        "class HistoryPage extends StatefulWidget {\n"
        "  const HistoryPage({super.key});\n"
        "\n"
        "  @override\n"
        "  State<HistoryPage> createState() => _HistoryPageState();\n"
        "}\n"
        "\n"
        "class _HistoryPageState extends State<HistoryPage> {\n"
        "  final _historyService = HistoryService();\n"
        "  List<String> _entries = [];\n"
        "\n"
        "  @override\n"
        "  void initState() {\n"
        "    super.initState();\n"
        "    _load();\n"
        "  }\n"
        "\n"
        "  Future<void> _load() async {\n"
        "    final entries = await _historyService.getHistory();\n"
        "    setState(() => _entries = entries.reversed.toList());\n"
        "  }\n"
        "\n"
        "  @override\n"
        "  Widget build(BuildContext context) {\n"
        "    return Scaffold(\n"
        "      appBar: AppBar(title: const Text('History')),\n"
        "      body: _entries.isEmpty\n"
        "          ? const Center(child: Text('No history yet.'))\n"
        "          : ListView.builder(\n"
        "              itemCount: _entries.length,\n"
        "              itemBuilder: (context, index) {\n"
        "                final dt = DateTime.parse(_entries[index]).toLocal();\n"
        "                return ListTile(\n"
        "                  leading: const Icon(Icons.access_time),\n"
        "                  title: Text('Tap #${_entries.length - index}'),\n"
        "                  subtitle: Text(\n"
        "                    '${dt.year}-${_pad(dt.month)}-${_pad(dt.day)}  '\n"
        "                    '${_pad(dt.hour)}:${_pad(dt.minute)}:${_pad(dt.second)}',\n"
        "                  ),\n"
        "                );\n"
        "              },\n"
        "            ),\n"
        "    );\n"
        "  }\n"
        "\n"
        "  String _pad(int n) => n.toString().padLeft(2, '0');\n"
        "}"
    )
    story.append(make_code_block_paragraphs(history_page_code, usable_width))
    story.append(Spacer(1, 6))

    # ─── SECTION 6: MAIN.DART ─────────────────────────────────────────────────
    story.extend(section_heading_flowable("6. lib/main.dart", styles))
    main_dart_code = (
        "import 'package:flutter/material.dart';\n"
        "import 'pages/home_page.dart';\n"
        "\n"
        "void main() => runApp(const MyApp());\n"
        "\n"
        "class MyApp extends StatelessWidget {\n"
        "  const MyApp({super.key});\n"
        "\n"
        "  @override\n"
        "  Widget build(BuildContext context) {\n"
        "    return MaterialApp(\n"
        "      title: 'Counter App',\n"
        "      theme: ThemeData(\n"
        "        colorScheme: ColorScheme.fromSeed(seedColor: Colors.deepPurple),\n"
        "        useMaterial3: true,\n"
        "      ),\n"
        "      home: const HomePage(),\n"
        "    );\n"
        "  }\n"
        "}"
    )
    story.append(make_code_block_paragraphs(main_dart_code, usable_width))
    story.append(Spacer(1, 6))

    # ─── KEY CONCEPTS TABLE ───────────────────────────────────────────────────
    story.extend(section_heading_flowable("Key Concepts to Know for the Interview", styles))
    story.append(Spacer(1, 4))

    table_data = [
        [
            Paragraph("<b>Concept</b>", ParagraphStyle("TH", fontName="Helvetica-Bold", fontSize=10, textColor=WHITE)),
            Paragraph("<b>What to say</b>", ParagraphStyle("TH", fontName="Helvetica-Bold", fontSize=10, textColor=WHITE)),
        ],
        [
            Paragraph("<font name='Courier' size='9'>StatefulWidget</font> vs <font name='Courier' size='9'>StatelessWidget</font>",
                      ParagraphStyle("TC", fontName="Helvetica", fontSize=10, leading=14)),
            Paragraph("StatefulWidget holds mutable state; <font name='Courier' size='9'>setState()</font> triggers a rebuild",
                      ParagraphStyle("TC", fontName="Helvetica", fontSize=10, leading=14)),
        ],
        [
            Paragraph("<font name='Courier' size='9'>initState()</font>",
                      ParagraphStyle("TC", fontName="Helvetica", fontSize=10, leading=14)),
            Paragraph("Called once when the widget is inserted into the tree \u2014 good place to load async data",
                      ParagraphStyle("TC", fontName="Helvetica", fontSize=10, leading=14)),
        ],
        [
            Paragraph("SharedPreferences",
                      ParagraphStyle("TC", fontName="Helvetica", fontSize=10, leading=14)),
            Paragraph("Key-value store persisted to disk; always async; stores primitives and string lists",
                      ParagraphStyle("TC", fontName="Helvetica", fontSize=10, leading=14)),
        ],
        [
            Paragraph("<font name='Courier' size='9'>Navigator.push</font>",
                      ParagraphStyle("TC", fontName="Helvetica", fontSize=10, leading=14)),
            Paragraph("Pushes a new route onto the navigation stack; <font name='Courier' size='9'>pop()</font> goes back",
                      ParagraphStyle("TC", fontName="Helvetica", fontSize=10, leading=14)),
        ],
        [
            Paragraph("<font name='Courier' size='9'>async/await</font>",
                      ParagraphStyle("TC", fontName="Helvetica", fontSize=10, leading=14)),
            Paragraph("Used with SharedPreferences since disk I/O is asynchronous",
                      ParagraphStyle("TC", fontName="Helvetica", fontSize=10, leading=14)),
        ],
    ]

    col_widths = [usable_width * 0.35, usable_width * 0.65]
    table = Table(table_data, colWidths=col_widths, repeatRows=1)

    table_style = TableStyle([
        # Header row
        ("BACKGROUND", (0, 0), (-1, 0), DEEP_PURPLE),
        ("TEXTCOLOR", (0, 0), (-1, 0), WHITE),
        ("FONTNAME", (0, 0), (-1, 0), "Helvetica-Bold"),
        ("FONTSIZE", (0, 0), (-1, 0), 10),
        ("TOPPADDING", (0, 0), (-1, 0), 8),
        ("BOTTOMPADDING", (0, 0), (-1, 0), 8),
        ("LEFTPADDING", (0, 0), (-1, 0), 10),
        ("RIGHTPADDING", (0, 0), (-1, 0), 10),
        # Data rows padding
        ("TOPPADDING", (0, 1), (-1, -1), 7),
        ("BOTTOMPADDING", (0, 1), (-1, -1), 7),
        ("LEFTPADDING", (0, 1), (-1, -1), 10),
        ("RIGHTPADDING", (0, 1), (-1, -1), 10),
        # Alternating row colors
        ("BACKGROUND", (0, 1), (-1, 1), WHITE),
        ("BACKGROUND", (0, 2), (-1, 2), ALT_ROW_COLOR),
        ("BACKGROUND", (0, 3), (-1, 3), WHITE),
        ("BACKGROUND", (0, 4), (-1, 4), ALT_ROW_COLOR),
        ("BACKGROUND", (0, 5), (-1, 5), WHITE),
        # Grid
        ("GRID", (0, 0), (-1, -1), 0.5, HexColor("#CCCCCC")),
        ("ROWBACKGROUND", (0, 0), (-1, 0), DEEP_PURPLE),
        # Vertical align
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
    ])
    table.setStyle(table_style)
    story.append(table)
    story.append(Spacer(1, 10))

    # ─── EXTRA CHALLENGES ─────────────────────────────────────────────────────
    story.extend(section_heading_flowable("Things the Interviewer May Ask You to Add", styles))
    story.append(Spacer(1, 4))

    challenges = [
        ("Persistence of the counter itself",
         "— store <font name='Courier' size='9'>_count</font> in SharedPreferences too "
         "(use <font name='Courier' size='9'>prefs.getInt</font> / <font name='Courier' size='9'>setInt</font> "
         "and load it in <font name='Courier' size='9'>initState</font>)"),
        ("Undo last entry",
         "— remove the last element from the list and decrement <font name='Courier' size='9'>_count</font>"),
        ("Confirmation dialog before clearing",
         "— use <font name='Courier' size='9'>showDialog</font> with <font name='Courier' size='9'>AlertDialog</font>"),
        ("Swipe to delete",
         "— wrap <font name='Courier' size='9'>ListTile</font> in a <font name='Courier' size='9'>Dismissible</font> widget"),
    ]

    bb_style = ParagraphStyle(
        "BB",
        fontName="Helvetica",
        fontSize=10,
        leading=15,
        textColor=HexColor("#212121"),
        leftIndent=18,
        spaceAfter=6,
        bulletIndent=6,
    )

    for bold_part, rest in challenges:
        story.append(Paragraph(
            f'<bullet>\u2022</bullet> <b>{bold_part}</b> {rest}',
            bb_style
        ))

    story.append(Spacer(1, 20))

    # Build the PDF
    doc.build(story, onFirstPage=add_page_number, onLaterPages=add_page_number)
    print(f"PDF generated: {OUTPUT_PATH}")
    size = os.path.getsize(OUTPUT_PATH)
    print(f"File size: {size:,} bytes")
    return size


if __name__ == "__main__":
    size = generate_pdf()
    if size > 0:
        print("SUCCESS")
    else:
        print("ERROR: file is empty")
