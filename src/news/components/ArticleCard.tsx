import React from 'react';
import { Article } from '@/news/types/article.type.ts';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card.tsx';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Card>
      <CardHeader>
        <img
          className={'object-cover h-[200px]'}
          src={article.image || 'https://placehold.co/200x100'}
          alt={article.title}
        />
        <CardTitle>{article.title}</CardTitle>
        <CardDescription>{article.description}</CardDescription>
      </CardHeader>
      {/*<CardContent>
        <p>{article.category}</p>
      </CardContent>*/}
      <CardFooter>
        <div
          className={'flex flex-grow-0 justify-between items-end w-full h-full'}
        >
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 text-xs mt-1"
          >
            Read more
          </a>
          <div className="text-xs text-gray-400 mt-1">{article.dataSource}</div>
          <p className="text-xs text-gray-400 mt-1">
            {new Date(article.date).toLocaleDateString()}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ArticleCard;
