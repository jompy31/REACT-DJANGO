import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import FileDataService from '../../services/files';


const posts = [
  {
    id: 1,
    title: 'Efficient, Accurate, Disturbance-Free: IR Heating',
    href: '#',
    category: { name: 'Article', href: '#' },
    description:
      'Pablo´s opinion, todays engineer: IR heating, the superior choice. Efficient, accurate and without disturbances. Ideal for thermal measurements of small samples.',
    date: 'Mar 16, 2023',
    datetime: '2023-03-16',
    imageUrl: 'PLP_3D',

    author: {
      name: 'Roel Aufderehar',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 2,
    title: 'Precise, Versatile: IR Heating, Efficient',
    href: '#',
    category: { name: 'Video', href: '#' },
    description:
      'IR heating systems offer significant advantages in efficiency and precision. Ideal for inspection and compliance applications.',
    date: 'Mar 10, 2023',
    datetime: '2023-03-10',
    imageUrl: 'Pads',
    readingTime: '4 min',
    author: {
      name: 'Brenna Goyette',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
  {
    id: 3,
    title: 'Efficient, Precise, Versatile: IR Heating',
    href: '#',
    category: { name: 'Case Study', href: '#' },
    description:
      'The installation and maintenance of IR heating systems is easier and does not generate harmful products. A smart choice for efficiency and environmental protection.',
    date: 'Feb 12, 2023',
    datetime: '2023-02-12',
    imageUrl: 'PCB',
    readingTime: '11 min',
    author: {
      name: 'Daniela Metz',
      href: '#',
      imageUrl:
        'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
  },
];

export default function UseCases() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [hoveredPost, setHoveredPost] = useState(null);
  const [images, setImages] = useState({});
  const token = useSelector(state => state.authentication.token);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = () => {
    FileDataService.getAll(token)
      .then(response => {
        const imageMap = {};
        response.data.forEach(file => {
          if (file.name === 'PLD_3D') {
            imageMap['PLP_3D'] = file.file;
          } else if (file.name === '3Dpads') {
            imageMap['Pads'] = file.file;
          } else if (file.name === 'PCB') {
            imageMap['PCB'] = file.file;
          }
        });
        setImages(imageMap);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const handlePostHover = (post) => {
    setHoveredPost(post);
  };

  const handleClose = () => {
    setSelectedPost(null);
  };

  return (
    <div className="relative bg-transparent px-4 pt-16 pb-20 sm:px-6 lg:px-8 lg:pt-24 lg:pb-28">
      <div className="absolute inset-0">
        <div className="h-1/3 bg-transparent sm:h-2/3" />
      </div>
      <div className="relative mx-auto lg:mx-12 max-w-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Some of our cases</h2>
        </div>
        <div className="mx-auto mt-12 grid max-w-lg gap-5 lg:max-w-none lg:grid-cols-3">
          {posts.map((post, index) => (
            <div
              key={post.title}
              className={`flex flex-col overflow-hidden rounded-lg shadow-lg ${
                hoveredPost === post ? 'scale-105' : 'scale-100'
              }`}
              onMouseEnter={() => handlePostHover(post)}
              onMouseLeave={() => handlePostHover(null)}
            >
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={images[post.imageUrl]} alt={post.title} />
              </div>
              <div className="flex flex-1 flex-col justify-between bg-white p-6">
                <div className="flex-1">
                  <p className="text-sm font-medium text-indigo-600">
                    <a href={post.category.href} className="hover:underline">
                      {post.category.name}
                    </a>
                  </p>
                  <a href={post.href} className="mt-2 block">
                    <p className="text-xl font-semibold text-gray-900">{post.title}</p>
                    <p className="mt-3 text-base text-gray-500">{post.description}</p>
                  </a>
                </div>

                <div className="mt-6 flex items-center">
                  <div className="flex-shrink-0">
                    <a href={post.author.href}>
                      <span className="sr-only">{post.author.name}</span>
                      <img className="h-10 w-10 rounded-full" src={post.author.imageUrl} alt={post.author.href} />
                    </a>
                  </div>

                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                    <div className="flex space-x-1 text-sm text-gray-500">
                      <time dateTime={post.datetime}>{post.date}</time>
                      <span aria-hidden="true">&middot;</span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedPost === post && (
                <div className="absolute inset-0 bg-white bg-opacity-95 flex items-center justify-center z-10">
                  <div className="max-w-xl p-8">
                    <div className="flex items-start justify-between">
                      <h3 className="text-xl font-bold text-gray-900">{post.title}</h3>
                      <button
                        className="text-blue-500 hover:text-gray-700 focus:outline-none"
                        onClick={handleClose}
                      >
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center">
                        <img className="h-12 w-12 rounded-full" src={post.author.imageUrl} alt={post.title} />
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{post.author.name}</p>
                          <div className="flex space-x-1 text-sm text-gray-500">
                            <time dateTime={post.datetime}>{post.date}</time>
                            <span aria-hidden="true">&middot;</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <p className="font-bold">{post.title}</p>
                        <p className="mt-2 text-base text-gray-500">{post.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 z-0" onClick={() => handlePostClick(post)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
