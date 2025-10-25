export default function Footer() {
  return (
    <footer className='bg-[#0f172a] text-[#94a3b8] py-6 border-t border-[#1e293b] mt-auto'>
      <div className='max-w-7xl mx-auto px-4 text-center text-sm'>
        <p>
          Desenvolvido por{' '}
          <a
            href='https://www.linkedin.com/in/carlosmouradev'
            target='_blank'
            rel='noopener noreferrer'
            className='text-[#22d3ee] hover:text-[#38bdf8] transition font-medium'
          >
            Carlos Eduardo Moura Lemes
          </a>{' '}
          &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
