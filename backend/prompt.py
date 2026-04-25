PROMPT_TEMPLATE = """
Extract structured HCP interaction details from the paragraph.

Rules:
- Return ONLY valid JSON
- No explanation
- Fill missing values with "" or [] for arrays
- Sentiment must be Positive, Neutral, or Negative

Use this structure:

{{
  "hcp_name": "",
  "interaction_type": "",
  "date": "",
  "time": "",
  "attendees": [],
  "topics_discussed": "",
  "materials_shared": "",
  "samples_distributed": "",
  "hcp_sentiment": "",
  "outcomes": "",
  "follow_up_actions": ""
}}

Paragraph:
{input_text}
"""