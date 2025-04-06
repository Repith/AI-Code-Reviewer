import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

@Injectable()
export class AiReviewService {
  private readonly logger = new Logger(AiReviewService.name);
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async getStreamingFeedback(
    code: string,
    language: string,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    this.logger.log(`Getting streaming feedback for ${language} code`);
    try {
      const stream = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'You are an expert JavaScript/TypeScript reviewer.' },
          {
            role: 'user',
            content: `Analyze this ${language} code and provide feedback on best practices, performance, and possible errors:\n\nCODE:\n${code}`,
          },
        ],
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        if (content) {
          onChunk(content);
        }
      }
    } catch (error) {
      this.logger.error(`Error streaming AI feedback: ${error.message}`, error.stack);
      onChunk('Error generating feedback. Please try again later.');
    }
  }
}
